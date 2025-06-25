import fs from 'fs/promises';
import path from 'path';
import prettier from 'prettier';

const outputDir = '_site';

async function processHTMLFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            await processHTMLFiles(fullPath);
        } else if (entry.name.endsWith('.html')) {
            let content = await fs.readFile(fullPath, 'utf-8');

            content = content.replace(/^\s*\n/gm, '');
            const formatted = await prettier.format(content, {
                parser: "html",
            });

            if (formatted !== content) {
                await fs.writeFile(fullPath, formatted, 'utf-8');
                console.log(`Formatted: ${fullPath}`);
            }
        }
    }
}

await processHTMLFiles(outputDir);
