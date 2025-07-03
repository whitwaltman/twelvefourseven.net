export default {
    layout: "layouts/post.njk",
    eleventyComputed: {
        dateSlug: function (data) {
            const date = new Date(data.page.date);
            return `${date.getUTCFullYear()}/${date.getMonth() + 1}/${date.getDate()}/`;
        },
        permalink: (data) => data.dateSlug + data.page.fileSlug + "/index.html"
    }
}