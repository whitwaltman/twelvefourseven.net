const isProduction = process.env.NODE_ENV === "production";

export default {
    layout: "note.njk",
    // https://www.11ty.dev/docs/data-computed/
    eleventyComputed: {
        permalink: (data) => {
            if (isProduction && data.draft) return false;
            return `/${data.page.fileSlug}/`;
        },
        title: (data) => {
            if (data.title) return data.title;
            const slug = data.page.fileSlug.split("-").join(" ");
            return slug[0].toUpperCase() + slug.slice(1);
        },
        updated: (data) => {
            const normalized = data.page.inputPath.replace(/^\.\//, "");

            const gitDateStr = data.gitUpdated[normalized];
            if (!gitDateStr) return null;

            const gitDate = new Date(gitDateStr);
            const pubDate = new Date(data.page.date);

            const diff_ms = gitDate.getTime() - pubDate.getTime();
            const diff_days = diff_ms / (1000 * 60 * 60 * 24);
            
            return diff_days >= 1 ? gitDate : null;
        }
    }
}