export default {
    layout: "layouts/post.njk",
    section: "blog",
    eleventyComputed: {
        permalink: (data) => "blog/" + data.page.fileSlug + "/index.html",
    }
}