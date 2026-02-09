# twelvefourseven.net

This is the repository for my personal website. It's built using Eleventy, a static site generator.

I try my best to use tags to "track" non-trivial updates and version history. As of January 31, 2026, I'm on `v1.0.3`. My versioning system isn't robust or anything, it's mostly based on semver (`major.minor.patch`). In practice, this mostly means:

- `major`: significant visual design and/or information architecture changes
- `minor`: new pages are added/removed
- `patch`: content updates to existing pages

## notes to self

- i removed `config.addPassthroughCopy('img');` from the config because it was unnecessarily copying the original image to the build directory
    - now, the image transformer just takes the input url path and caches the output / copies it to the correct build location
- in removing tailwind, i've decided to move my css files to `/public/css/`. although, now that i think about it, since i'm copying the whole 'public' folder over, maybe i don't need css in `/public` since i want to inline it...
    - i'll revisit this decision later
- `.husky/` file is ignored in git tracking, but the only thing I changed was the contents of `.husky/pre-commit`, which just contains `npx lint-staged`