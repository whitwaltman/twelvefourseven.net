export default {
    layout: "layouts/post.njk",
    eleventyComputed: {
        dateSlug: function (data) {
            const date = new Date(data.page.date);
            const result = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });
            return result.slice(-4) + "/" + result.slice(0, -4);
        },
        permalink: (data) => data.dateSlug + data.page.fileSlug + "/index.html"
    }
}