export default {
    layout: "layouts/post.njk",
    section: "notes",
    eleventyComputed: {
        permalink: (data) => "notes/" + data.page.fileSlug + "/index.html",
    }
}