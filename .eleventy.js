import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import yaml from "js-yaml";

export default async function (config) {
    config.on('eleventy.before', async () => {
        const inputPath = path.resolve('./src/css/main.css');
        const outputPath = path.resolve('./_site/css/main.css');
        const cssContent = fs.readFileSync(inputPath, 'utf8');

        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const result = await processor.process(cssContent, {
            from: inputPath,
            to: outputPath,
        });
        fs.writeFileSync(outputPath, result.css);
    })

    const processor = postcss([
        tailwindcss(),
    ]);

    config.addDataExtension("yaml", (contents) => {
        return yaml.load(contents)
    });
    
    config.addShortcode("a", function (url, text) {
        return `<a class="ext-link" target="_blank" rel="noopener noreferrer"
                href="${url}">${text}<span>&nearrow;</span></a>`;
    });

    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: "src",
            output: "_site",
        }
    };
}