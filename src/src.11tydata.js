import fs from "fs";

export default {
    layout: "note.njk",
    // https://www.11ty.dev/docs/data-computed/
    eleventyComputed: {
        permalink: (data) => `/${data.page.fileSlug}/`,
        title: (data) => {
            const slug = data.page.fileSlug.split("-").join(" ");
            return slug[0].toUpperCase() + slug.slice(1);
        },
        // https://joshtronic.com/2025/07/20/last-modified-date-eleventy/
        updated: (data) => {
            const stats = fs.statSync(data.page.inputPath);
            const mtime = stats.mtime;

            const ogDate = new Date(data.page.date).toISOString().split("T")[0];
            const mDate = new Date(mtime).toISOString().split("T")[0];

            if (mDate !== ogDate) return mtime;
            return null;
        }
    }
}