export default {
    layout: "layouts/base.njk",
    eleventyComputed: {
        permalink: (data) => "blog/" + data.page.fileSlug + "/index.html",
    }
}