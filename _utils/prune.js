import fs from "fs";
import path from "path";

const outFile = "./_data/gitUpdated.json";
const contentDir = "./src"

async function pruneMetadata(data, dir) {
    const existing = new Set(
        fs.readdirSync(dir, { recursive: true })
            .map((file) => path.join(dir, file))
    );

    const initialCount = Object.keys(data).length;

    // Remove keys not in the existing set
    Object.keys(data).forEach(key => {
        if (!existing.has(key)) {
            delete data[key];
        }
    });

    const finalCount = Object.keys(data).length;
    console.log(`Pruned ${initialCount - finalCount} dead entries`);
    return data;
}

async function syncPruned(file, srcDir) {
    let data = {};
    if (fs.existsSync(file)) {
        data = JSON.parse(fs.readFileSync(file));
    }

    const prunedData = await pruneMetadata(data, srcDir);

    fs.writeFileSync(file, JSON.stringify(prunedData, null, 2));
}

await syncPruned(outFile, contentDir);