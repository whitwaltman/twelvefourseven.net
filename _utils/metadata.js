import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import matter from "gray-matter";

const contentDir = "./src";

async function updateMetadata(dir) {
    const files = fs.readdirSync(dir).filter(file => file.endsWith(".md"));

    files.forEach((file) => {
        const filePath = path.join(dir, file);

        const gitDate = execSync(`git log -1 --format=%ai "${filePath}`).toString().trim();

        if (gitDate) {
            const fileContent = fs.readFileSync(filePath, "utf8");
            const { data, content } = matter(fileContent);
            const newDate = new Date(gitDate).toISOString().split('T')[0];

            // Only update if the date hasn't changed AND isn't already set correctly
            if (data.updated !== newDate) {
                data.updated = newDate;
                const updatedContent = matter.stringify(content, data);
                fs.writeFileSync(filePath, updatedContent);
                console.log(`Updated metadata for ${file}`);
            }
        }
    });
}

await updateMetadata(contentDir);