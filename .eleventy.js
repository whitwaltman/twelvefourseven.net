import pluginWebc from "@11ty/eleventy-plugin-webc";

export default async function (config) {
    config.addPlugin(pluginWebc, {
        components: "_includes/components/*.webc"
    });

    // https://stackoverflow.com/a/79218094
    config.addGlobalData('layout', 'layouts/base.html');

    config.addShortcode("extLink", function (url, text) {
        return `<a class='ext-link' target='_blank' rel='noopener noreferrer' 
            href='${url}'>${text}<span>&nearrow;</span></a>`;
    });

    config.addFilter('formatBuildDate', function (date) {
        return date.toString();
    });
    
    return {
        markdownTemplateEngine: 'liquid',
        dataTemplateEngine: 'liquid',
        htmlTemplateEngine: 'liquid',
        dir: {
            input: "src",
            output: "_site",
        }
    };
}