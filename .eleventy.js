const fsp = require('fs/promises');
// const fs = require('fs');

module.exports = async function (config) {
    config.setTemplateFormats("html,css,md,njk");
    config.addPassthroughCopy('./src/assets/');

    config.on('eleventy.before', async ({ dir }) => {
        await fsp.rm(dir.output, { recursive: true, force: true });
    });

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