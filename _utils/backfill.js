import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { execSync } from "child_process";

const contentDir = "./src";

async function backfill(dir) {
    const files = fs.readdirSync(contentDir, { recursive: true })
                    .filter((file) => file.endsWith(".md"));
    
    files.forEach((file) => {
        const fp = path.join(dir, file);
        const fileContent = fs.readFileSync(fp, "utf8");
        const { data, content } = matter(fileContent);

        if (!data.date) {
            try {
                const initCommit = execSync(`git log --diff-filter=A --format=%aI -- "${fp}" | tail -1`)
                                    .toString().trim();
                if (initCommit) {
                    const cleanDate = initCommit.split("T")[0];
                    data.date = `${cleanDate}T12:00:00Z`;

                    const updatedContent = matter.stringify(content, data);
                    fs.writeFileSync(fp, updatedContent);
                    console.log(`Stamped ${file} with ${cleanDate}`);
                }
            } catch (e) {
                console.log(`Could not find git history for ${file}, skipping`);
            }
        }
    });
}

await backfill(contentDir);