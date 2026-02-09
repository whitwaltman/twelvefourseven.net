import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const outputFile = "./_data/gitUpdated.json";

async function updateMetadata(out) {
    // Ensure output file directory exists
    const dir = path.dirname(out);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Read existing data or start fresh
    let dates = {};
    if (fs.existsSync(out)) {
        dates = JSON.parse(fs.readFileSync(out, "utf8"));
    }

    // Get files passed by lint-staged
    const files = process.argv.slice(2);
    // Get current working directory
    const rt = process.cwd();
    
    files.forEach((fp) => {
        if (fp.endsWith(".md")) {
            // Convert absolute path to relative path for key usage
            const rp = path.relative(rt, fp);

            try {
                // Get the ISO date of the last commit for this file
                const log = execSync(`git log -1 --format=%cI -- "${fp}"`).toString().trim();
                // Set date or create new one as fallback if new file
                dates[rp] = log || new Date().toISOString();
            } catch (e) {
                dates[rp] = new Date().toISOString();
            }
        }
    });

    const sortedDates = Object.keys(dates).sort().reduce((acc, key) => {
        acc[key] = dates[key];
        return acc;
    }, {});

    fs.writeFileSync(out, JSON.stringify(sortedDates, null, 2));
    console.log(`Git update metadata written to ${out}`);
}

await updateMetadata(outputFile);