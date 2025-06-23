// const fsp = require('fs/promises');
import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';

export default async function (config) {
    // clean _site directory before generating output
    // config.on('eleventy.before', async ({ dir }) => {
    //     await fsp.rm(dir.output, { recursive: true, force: true });
    // });
    config.setTemplateFormats("html,css,md,njk");
    config.addPassthroughCopy('./src/assets/');

    config.addCollection('blogPosts', function (collectionAPI) {
        return collectionAPI.getFilteredByGlob('./src/posts/blog/*.md');
    });
    
    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: "src",
            output: "_site",
            data: "_data"
        }
    };
}