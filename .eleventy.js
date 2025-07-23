import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';

export default async function (config) {
    config.addPlugin(eleventyImageTransformPlugin);
    
    config.addPassthroughCopy({
        './src/assets/': 'assets',
        './src/css/': 'css'
    });

    config.setFrontMatterParsingOptions({
        excerpt: true,
    });

    config.addCollection('posts', function (collection) {
        return collection.getFilteredByGlob('./src/posts/*.md');
    });

    config.addCollection('recent', function (collection) {
        return collection.getFilteredByGlob('./src/posts/*.md').sort(function (a, b) {
            return b.date - a.date;
        }).slice(0,12);
    })

    config.addCollection('new', function (collection) {
        // https://www.11ty.dev/docs/collections-api/
        return collection.getFilteredByGlob('./src/posts/*.md').sort(function (a, b) {
            return b.date - a.date;
        }).slice(0,1);
    });

    config.addShortcode("extLink", function (url, text) {
        return `<a class='ext-link' target='_blank' rel='noopener noreferrer' 
            href='${url}'>${text}<span>&nearrow;</span></a>`;
    });

    config.addShortcode("break", function () {
        return `<hr class="my-4 w-1/3">`;
    });

    config.addFilter('truncate', function (text) {
        return text.slice(0, 155) + "...";
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

    config.addFilter('formatTime', function (created) {
        const date = new Date(created);
        const time = date.toLocaleTimeString('en-US', {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit'
        });
        return `${time}`;
    })

    config.addFilter('formatPublishDate', function (created) {
        const date = new Date(created);
        const options = {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        };
        const day = date.toLocaleString('en-GB', options);
        return `${day.slice(0,3)} ${day.slice(4)}`
    })
    
    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: ".",
            includes: "src/_includes",
            output: "_site",
            data: "src/_data"
        }
    };
}