export default {
    layout: "layouts/base.njk",
    eleventyComputed: {
        permalink: (data) => data.page.filePathStem.replace("/pages/", "") + "/index.html",
        section: (data) => data.page.fileSlug,
    }
}