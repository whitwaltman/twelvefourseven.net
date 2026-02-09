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
        updated: (data) => {
            const gitDates = require("../_data/gitUpdated.json");
            return gitDates[data.page.inputPath] || data.page.date;
        }
    }
}