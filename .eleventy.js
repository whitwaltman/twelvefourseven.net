import fs from 'fs';
import yaml from 'js-yaml';
import filters from './_utils/filters.js';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';

export default async function (config) {
    // Copy public assets
    config.addPassthroughCopy({
        "./public": "/",
    });

    // Add global default layout
    config.addGlobalData('layout', 'base.njk');

    // Register filters (h/t Chase McCoy)
    Object.keys(filters).forEach((filter) => {
        config.addFilter(filter, filters[filter]);
    });

    // Add notes collection
    config.addCollection("notes", (collection) => {
        return collection.getFilteredByGlob("notes/*.md");
    });

    // Add image transformer plugin with specified configuration
    config.addPlugin(eleventyImageTransformPlugin, {
        urlPath: './img',
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
        return yaml.load(contents);
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
            input: '.',
            includes: '_includes',
            data: '_data',
            output: '_site',
        }
    };
}