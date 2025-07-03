# twelvefourseven.net

## build and deploy
1. `npm run build:clean`
2. `npm run format`
3. `./deploy.sh` (optional `--delete` flag available)

## directory structure
- all site content is located in /src
- config follows standard eleventy conventions (src/_includes for layouts, src/_data for global data)
- favicon is in src/assets, global css is in src/css/main.css
- src/pages holds all "root" level pages except index and error pages
    - i use an 11ty data file to generate some of the front matter for me, and for some reason, it really didn't like doing it for my index page (i would get _site/index/index.html or something like that)
- src/root current holds just my index and 404 pages. i may add more "root" pages but for now i'm pretty set on what i have
- in src, i have a file called .eleventyignore, which currently only contains a single file (root/404.njk). the reason for this is that my vps config is kind of particular about my error docs, *and* i don't really see them changing all that much on a regular basis
    - in my vps, i did `mv /var/www/twelvefourseven.net/404/index.html /var/www/tfs.errdocs/404.html` and then deleted the empty 404 directory
    - i'll only remove that line from "eleventy ignore" if there are new changes i want to deploy to my error page, and then i'll do that step again to make sure my web server properly routes requests to it
- src/posts are my blog posts. i also have an 11ty data file in that directory. the most important thing it does is compute a permalink that matches the uri structure i want (`/year/month/day/slug/index.html`)
    - the nice thing is, i can easily change that structure by modifying the eleventyComputed data in my front matter, although i really want to avoid messing with that
    - remember, [cool URIs don't change](https://www.w3.org/Provider/Style/URI). URI's don't change: people change them.

## project notes
- this site is built with eleventy and uses nunjucks as its templating language
    - nunjucks is one of the default templating languages (i.e. doesn't require plugin installation) and is used in the very helpful [Learn Eleventy](https://learn-eleventy.pages.dev/) course/walkthrough
    - other supported template languages can be found [here](https://www.11ty.dev/docs/languages/) in the eleventy docs
- this site also uses tailwind to maintain an overall visual consistency and to make styling on mobile a lot easier