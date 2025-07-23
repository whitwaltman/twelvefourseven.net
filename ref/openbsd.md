---
title: Self-hosting with OpenBSD
date: Last Modified
---
<aside class="bg-lime-200 border-1 border-lime-400 p-1 rounded-sm my-1.5">
    <p>These notes are specifically tailored to my usage of OpenBSD as a virtual private server to host my websites.</p>
    <p class="mb-0">If you're new to self-hosting or want to explore it, I highly recommend <a class="bg-lime-400" href="https://sive.rs/ti">Derek Siver's guide to Tech Independence</a>. It's a helpful starting point, although I would caution against trying to do everything at once.</p>
</aside>

### httpd

OpenBSD's built-in web server is called `httpd`. Unfortunately, this is also the name of the more prominent Apache webserver. So, any time you search online for information related to `httpd`, you should probably also specify "OpenBSD".

There are some great tutorials and walkthroughs already out there, so I'm not going to re-hash what's been written. Here's a couple of them in case you're looking for a guided write-up:

- [httpd.rocks](https://httpd.rocks/)
- [Basic Web Server (httpd) | OpenBSD Handbook](https://www.openbsdhandbook.com/services/webserver/basic_webserver/)
- [How to setup a web server with OpenBSD](https://www.bsdhowto.ch/webserver.html)

I'd also be remiss to not mention the OpenBSD `man` pages, arguably the gold-standard of documentation. <a href="https://man.openbsd.org/httpd.conf">Here's the one for httpd</a>.

It's a good idea to obtain an SSL certificate for your site. Once you create your webroot directory (default chroot jail = `/var/www`), you can edit `/etc/httpd.conf` so you can access your site. (I'm skipping a lot of the initial setup steps. Read one of the tutorials I linked if you need more help.)

Before you get your SSL certificate, server blocks typically look something like this:
```
server "twelvefourseven.net" {
    alias "www.twelvefourseven.net"
    listen on $ext_ip port 80
    root "/twelvefourseven.net"
    location "/.well-known/acme-challenge/*" {
        root "/twelvefourseven.net"
    }
}
```

Once you have that, run `doas rcctl enable httpd` (can omit the `doas` if you've assumed the `root` identity) and then `doas rcctl start httpd`. Now we can obtain our SSL cert.

OpenBSD does have a default client for getting SSLs. Personally, I found it a bit frustrating to use, so I opted to use `certbot` instead. If you want to use the default ACME client, [here's a guide on how to do so](https://www.openbsdhandbook.com/services/webserver/ssl/).

On OpenBSD, `certbot` doesn't come pre-installed, so you need to run `pkg_add certbot` to use it. Here's a helpful [FAQ on OpenBSD Package Management](https://www.openbsd.org/faq/faq15.html).

Once it's installed, you can run the following (with your own website and webroot, of course).
```
certbot certonly --webroot -w /var/www/twelvefourseven.net -d twelvefourseven.net
```

Then, you can go back and edit your `etc/httpd.conf` file to actually use your new SSL certificate. Now, you'll have two server blocks for your domain: one for HTTPS traffic, and the other for HTTP, which will redirect to the HTTPS port.
```
server "twelvefourseven.net" {
    alias "www.twelvefourseven.net"
    listen on $ext_ip port 80
    block return 301 "https://$HTTP_HOST$REQUEST_URI"
}

server "twelvefourseven.net" {
    alias "www.twelvefourseven.net"
    listen on $ext_ip tls port 443
    root "/twelvefourseven.net"
    tls {
        certificate "/etc/letsencrypt/live/twelvefourseven.net/fullchain.pem"
        key "/etc/letsencrypt/live/twelvefourseven.net/privkey.pem"
    }
}
```

Then, don't forget to run `doas rcctl restart httpd`. That's the gist of a simple, yet robust web server set-up. I'll come back and add more stuff later on creating custom error docs, specifying access logs, and creating block lists.