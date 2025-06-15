const fsp = require('fs/promises');
const fs = require('fs');

module.exports = async function (config) {
    config.setTemplateFormats("html,css,md,njk");

    config.on('eleventy.before', async ({ dir }) => {
        await fsp.rm(dir.output, { recursive: true, force: true });
    });
    
    return {
        dir: {
            input: "src",
            output: "_site",
            data: "_data"
        }
    };
}
