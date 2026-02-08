// https://www.11ty.dev/docs/data-computed/
export default {
    layout: "note.njk",
    eleventyComputed: {
        permalink: (data) => `/${data.page.fileSlug}/`,
        title: (data) => {
            const slug = data.page.fileSlug.split("-").join(" ");
            return slug[0].toUpperCase() + slug.slice(1);
        },
        
    }
}