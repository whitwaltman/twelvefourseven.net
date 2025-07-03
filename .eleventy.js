import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';

export default async function (config) {
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
        // https://robmc.dev/blog/add-css-to-your-eleventy-site/
        config.addWatchTarget('./src/css/main.css');
    });

    const processor = postcss([
        tailwindcss(),
    ]);

    config.setFrontMatterParsingOptions({
        excerpt: true,
    });

    config.addPassthroughCopy('./src/assets/');

    config.addCollection('posts', function (collection) {
        return collection.getFilteredByGlob('./src/posts/*.md');
    });

    config.addCollection('new', function (collection) {
        return collection.getFilteredByGlob('./src/posts/*.md').slice(0,1);
    })

    config.addFilter('convertTimestamp', function (timestamp) {
        const date = new Date(timestamp * 1000);
        const options = {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        };
        const day = date.toLocaleString('en-GB', options);
        const time = date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
        return `${day} at ${time}`
    });

    config.addFilter('formatBuildDate', function (date) {
        return date.toISOString();
        // return `${date.toDateString()} ${date.toLocaleTimeString()}`;
    });

    config.addFilter('formatPostDate', function (created) {
        const date = new Date(created);
        const options = {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        };
        const day = date.toLocaleString('en-GB', options);
        const time = date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
        return `${time}, ${day.slice(0,3)} ${day.slice(4)}`;
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