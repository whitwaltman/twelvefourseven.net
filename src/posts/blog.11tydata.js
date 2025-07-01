export default {
    layout: "layouts/base.njk",
    section: "blog",
    eleventyComputed: {
        permalink: (data) => "blog/" + data.page.fileSlug + "/index.html",
    }
}