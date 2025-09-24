export default async function (config) {
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