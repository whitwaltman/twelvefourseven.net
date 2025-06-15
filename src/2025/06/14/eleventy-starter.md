---
layout: layouts/html.njk
relative path: ../../../../..
---
This is how I set up a new Eleventy site. You may want to customize certain steps to your liking.
1. Open terminal
2. `cd parent_directory_of_new_site`
3. `mkdir new_site_directory`
4. `cd $_`
5. `echo "node_modules\n_site" >> .gitignore`
6. `touch .eleventy.js`
7. `nvim $_`
8. Enter insert mode. Add the following:
```js
module.exports.config = {
    dir: {
        input: "src"
    }
}
```
9. `npm init -y`
10. `npm install @11ty/eleventy`
10. `echo "sup" >> src/index.md`
11. `npx eleventy --serve`
12. Do `git init` and all that other good stuff