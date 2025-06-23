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

    config.on('eleventy.before', async () => {
        const tailwindInputPath = path.resolve('./src/css/main.css');
        const tailwindOutputPath = './_site/css/main.css';
        const cssContent = fs.readFileSync(tailwindInputPath, 'utf8');

        const outputDir = path.dirname(tailwindOutputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const result = await processor.process(cssContent, {
            from: tailwindInputPath,
            to: tailwindOutputPath,
        });

        fs.writeFileSync(tailwindOutputPath, result.css);
    });

    const processor = postcss([
        tailwindcss(),
    ]);

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