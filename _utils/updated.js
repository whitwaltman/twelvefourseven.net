import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const contentDir = "./src";
const outputFile = "./_data/gitUpdated.json";

async function updateMetadata(dir, out) {
    const dates = {};
    const files = fs.readdirSync(dir, { recursive: true })
                    .filter((file) => file.endsWith(".md"));
    
    files.forEach((file) => {
        const fp = path.join(dir, file);

        try {
            // Get the ISO date of the last commit for the file
            const log = execSync(`git log -1 --format=%cI -- "${fp}`).toString().trim();
            if (log) {
                dates[fp] = log;
            }
        } catch (e) {
            // New files that haven't been committed yet won't have a git log
            dates[fp] = new Date().toISOString();
        }
    });

    fs.writeFileSync(out, JSON.stringify(dates, null, 2));
    console.log(`Git update metadata written to ${out}`);
}

await updateMetadata(contentDir, outputFile);