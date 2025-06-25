export default {
    layout: "layouts/page.njk",
    eleventyComputed: {
        permalink: (data) => data.page.filePathStem.replace("/pages", "") + "/index.html",
        section: (data) => data.page.filePathStem.replace("/pages", ""),
    }
}