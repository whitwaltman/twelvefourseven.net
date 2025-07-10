---
title: Finding synonyms without the internet
description: Exploring a command-line tool for word synonyms
---

Like most programmers, I love puzzles. Some of the {% extLink "https://enigma.puzzlers.org/", "puzzles" %} I solve on a regular basis rely on a strong command of the English language. And while I am a native English speaker, synonyms have never been my strong suit. I don't mind using a quick internet search or even a specific site like {% extLink "https://www.powerthesaurus.org/", "Power Thesaurus" %}, but those solutions often interrupt my state of flow. Enter: {% extLink "https://github.com/words/moby", "Moby" %}.

Moby is billed as the "largest English-language thesaurus" and offers a simple command-line interface that can search a local, cached copy from your terminal. For me, this is the ideal set-up, given that I'm already likely to have my terminal open. Let's see what happens if we query Moby for synonyms of the word "butter" (as in, *"I can't believe it's not butter!"*):

![a screenshot of the results from running the moby command-line tool](/assets/butter.png)

That seems... less than ideal. A good deal of the synonyms are repeated in the "see also" section, which seems unnecessarily redundant. It makes a lot more sense in the context of the usage of the <a target="_blank" class="ext-link" href="https://moby-thesaurus.org/">Moby website<span class="text-xs">&nearrow;</span></a>, where you can tunnel down the rabbit hole of adjacent word associations, but it doesn't do me a whole lot of good in the terminal.

* * *

First, let's start by cleaning up the output a little. We can use the `tr` command *translate* the comma delimiter to a newline character, which lets us print each result on its own line. Then, we can wield a little `awk` magic to trim the leading whitespace:

```
moby butter | tr , '\n' | awk '{$1=$1};1'
```

I'm still a pretty novice `awk` user, given that it's an entire programming language in itself, but the last piped command just re-assigns the first field to itself (`$1=$1`) from inside an `awk` action block `{}` and then just prints the newly re-built line sans unnecessary whitespace. Of course, there are plenty of other ways to clean the output, but this one seems the simplest and most straight-forward to me.

Unfortunately, this introduces a new sort of problem. If we run the above command, we get almost 300 results, each printed on its own line. If you're like me, this might be a little better than the loooong list of comma-delimited results, but it's still not great.

<aside>
One of my most frequently used commands (both on its own and as a piped command) is <code>wc -l</code>, which prints the newline counts of a file or data stream. Instead of manually counting my output from running <code>moby</code> with <code>tr , '\n'</code>, I can chain <code>wc -l</code> to the end of my command pipeline to see how long my output will be.
</aside>