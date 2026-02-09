# twelvefourseven.net

This is the repository for my personal website. It's built using Eleventy, a static site generator.

This document is mostly written for my future self, to remind me of things I may have forgotten.

## versioning

I try my best to use git tags to "track" non-trivial updates and version history. As of February 9, 2026, I'm on `v1.0.4`.

My versioning system isn't robust or anything, it's mostly based on semver (`major.minor.patch`). In practice, this mostly means:

- `major`: significant visual design and/or information architecture changes
- `minor`: new pages are added/removed
- `patch`: content updates to existing pages

A nice side-effect of this system is that I can download a zipped version of my site as it was at any given version and build it to see what it looked like at that moment in time. This is my first time actually using git tags, so we'll see how this plays out.

## directory structure

Contrary to most Eleventy project setups, I use the root as my input source. I prefer it this way, but I understand why it's not the conventional approach.

The existence of an `src/` directory might be confusing in light of my previous statements, but it helps provide a physical boundary between my writing and *everything else* (configurations, templates, stylesheets, utility scripts, etc). This allows me to open a markdown editor and just **write**, without the distraction and clutter of all the other stuff I need to build this site.

I follow most other conventions (`_data` for global data files, `_includes` for templates and partials, `_site` for build output, etc).

## _utils

### format

Script that cleans up the generated HTML files to remove any weird line breaks or whitespace caused by the templating engine or what have you. Mostly just an aesthetic thing that brings me peace of mind. Uses the `prettier` package to handle formatting.

Runs with the `build:all` command I use in my deployment configuration. I don't really care about running it when I'm developing locally since the output gets overwritten so often. This is also why I keep it as a separate script instead of running it as a transform (more on transforms [below](#links)).

### filters

Defines custom filter functions. I used to keep my filters inside `.eleventy.js`, which is fine, but I wanted to modularize some of my code to make it cleaner and more readable.

I adopted this pattern after seeing Chase McCoy use it in [his config](https://github.com/chasemccoy/www/blob/main/.eleventy.js).

### links

Defines a function that's used as a transform in the build process. Transforms are used to modify a template's output, e.g. prettification or minification.

Adds custom formatting and attributes to any external link on my site, which reduces cognitive overhead for me when I'm writing or adding content. This also standardizes the style and appearance of external links so that they're consistent across different pages.

Uses `parseHTML` from the `linkedom` package to obtain the `document` object, which is used to query select all links. I append a small SVG arrow icon to each link to indicate that it's external, and add the class `ext-link` to defer style declarations to my CSS rules.

### updated

Node script that handles and updates metadata about content changes. This is a workaround intended to preserve content dates from being polluted by a fresh git clone. Runs at the pre-commit stage in the git lifecycle so that it runs automatically and couples the metadata updates with the content updates in the same commit.

Uses `lint-staged` to only process files that are being committed. Gets the relevant git history and uses the relative file path as a key for the last commit date. Writes out to a JSON file which sits in the global `_data` directory (`_data/gitUpdated.json`). Then, the `updated` attribute is computed or set by `src.11tydata.js` so that the metadata persists across build environments.

### prune

Handles the clean-up from the `updated` utility. Checks the existing metadata keys against the actual files in the content directory and removes any keys for files that have been deleted.

If a file is renamed, I prefer to just manually update the key accordingly, which also avoids a possible scenario in which a renamed file is treated as a new entity.

To run it, it's just `node _utils/prune.js`. It's used pretty sparingly, but it's a helpful utility on the occasions I do actually need it.

### backfill

Script that handles setting creation `date` to avoid fresh clone mishaps. Uses the `gray-matter` package to parse file contents and obtain metadata. If `date` hasn't been set yet, we look for a git history for the file. If there is none, we set date equal to the current date. Otherwise, we use the date of the file's first commit to populate the field.

The backfill script runs on `npm start` in order to ensure that every file has an explicit `date` value. I usually run `npm start` several times before pushing to deploy, so it shouldn't ever need to run outside of my local environment.