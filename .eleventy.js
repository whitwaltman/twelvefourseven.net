import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';

export default async function (config) {
    // Copy `img/` to `_site/img`
    config.addPassthroughCopy('img');

    // Before eleventy build, process css using postcss + tailwind
    // Copy processor results to `_site/css/main.css`
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

    // Create processor object
    const processor = postcss([
        tailwindcss(),
    ]);

    // Set up YAML parsing
    config.addDataExtension("yaml", (contents) => {
        return yaml.load(contents)
    });
    
    // Create shortcode for creating styled external links
    config.addShortcode("a", function (url, text) {
        const metadata = 'class="ext-link" target="_blank" rel="noopener noreferrer"';
        return `<a ${metadata} href="${url}">${text}<span>&nearrow;</span></a>`;
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