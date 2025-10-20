import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';

export default async function (config) {
    // Copy `img/` to `_site/img`
    config.addPassthroughCopy('img');

    // Add global default layout
    config.addGlobalData('layout', 'layouts/base.njk');

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
    });

    // Create processor object
    const processor = postcss([
        tailwindcss(),
    ]);

    // Add image transformer plugin with specified configuration
    config.addPlugin(eleventyImageTransformPlugin, {
        urlPath: '/img',
        outputDir: '.cache/@11ty/img/',
        failOnError: false,
        formats: ['webp'],
        widths: [720],
        htmlOptions: {
            imgAttributes: {
                loading: 'lazy',
                decoding: 'async'
            },
        },
    });

    // Cache image transformer results
    config.on('eleventy.after', () => {
        const cacheDir = '.cache/@11ty/img';
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
        }
        fs.cpSync(cacheDir, '_site/img', { recursive: true });
    });

    // Set up YAML parsing
    config.addDataExtension('yaml', (contents) => {
        return yaml.load(contents)
    });
    
    // Create shortcode for creating styled external links
    config.addShortcode('a', function (url, text) {
        const metadata = 'class="ext-link" target="_blank" rel="noopener noreferrer"';
        return `<a ${metadata} href="${url}">${text}<span>&nearrow;</span></a>`;
    });

    // Specify server port
    config.setServerOptions({ port: 1002 });

    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: 'src',
            output: '_site',
        }
    };
}