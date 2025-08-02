export default {
    layout: "layouts/page.njk",
    eleventyComputed: {
        permalink: (data) => data.page.filePathStem.replace("/src/", "") + "/index.html",
    }
}