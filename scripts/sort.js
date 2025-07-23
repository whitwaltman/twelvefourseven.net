import fs from 'fs';

function readJSON() {
    const file = process.argv[2];
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file: ', err);
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            // console.log(sortEntries(jsonData));
            const result = sortEntries(jsonData);
            fs.writeFileSync(file, JSON.stringify(result));
        } catch (parseError) {
            console.error('Error parsing JSON: ', parseError);
        }
    });
}

function sortEntries(data) {
    return data.sort((a, b) => a.title.localeCompare(b.title));
}

readJSON();