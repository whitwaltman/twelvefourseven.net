export default {
    layout: "layouts/page.njk",
    eleventyComputed: {
        permalink: (data) => data.page.fileSlug + "/index.html",
        section: (data) => data.page.fileSlug,
    }
}