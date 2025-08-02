import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';

export default async function (config) {
    config.addPlugin(eleventyImageTransformPlugin);
    
    config.addPassthroughCopy({
        './src/assets/': 'assets',
        './src/css/': 'css'
    });

    // https://stackoverflow.com/a/79218094
    config.addGlobalData('layout', 'layouts/base.njk');

    config.setFrontMatterParsingOptions({
        excerpt: true,
    });

    config.addCollection('index', function (collection) {
        const all = collection.getAll().filter(function (item) {
            return item.url !== false && item.url !== "/";
        });

        return all.sort((a, b) => b.url - a.url);
    });

    config.addCollection('posts', function (collection) {
        return collection.getFilteredByGlob('./posts/*.md');
    });

    config.addCollection('recent', function (collection) {
        return collection.getFilteredByGlob('./posts/*.md').sort((a, b) => {
            return b.date - a.date;
        }).slice(0,8);
    });

    config.addCollection('shoebox', function (collection) {
        return collection.getFilteredByGlob('./shoebox/*.njk');
    });

    config.addCollection('now', function (collection) {
        return collection.getFilteredByGlob('./now/*.md').sort(function (a, b) {
            return b.date - a.date;
        }).slice(0, 1);
    });

    config.addCollection('then', function (collection) {
        return collection.getFilteredByGlob('./now/*.md').sort(function (a, b) {
            return b.date - a.date;
        }).slice(1);
    });

    // config.addCollection('new', function (collection) {
    //     // https://www.11ty.dev/docs/collections-api/
    //     return collection.getFilteredByGlob('./posts/*.md').sort(function (a, b) {
    //         return b.date - a.date;
    //     }).slice(0,1);
    // });

    config.addShortcode("extLink", function (url, text) {
        return `<a class='ext-link' target='_blank' rel='noopener noreferrer' 
            href='${url}'>${text}<span>&nearrow;</span></a>`;
    });

    config.addShortcode("break", function () {
        return `<hr class="xh1 bg-white w3 ml0 mv5 bb-0 bl-0 br-0 bt-1 b--black" />`;
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

    config.addFilter('formatPageDate', function (created) {
        const date = new Date(created);
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${date.getFullYear()}-${month}-${day}`;
    });

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
    });
    
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