import fs from 'fs';
import path from 'path';

// Specify the folder path where your .js files are located
function readJSFilesAndExtractData(folderPath) {
    const data = [];

    // Read all files in the folder
    fs.readdirSync(folderPath).forEach(file => {
        if (file.endsWith('.js')) {
            const filePath = path.join(folderPath, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');

            // Extract relevant data from the file content (customize this part)
            // For example, extract function names, variables, etc.
            const extractedData = { fileName: file, content: fileContent };
            data.push(extractedData);
        }
    });

    return data;
}

function saveDataToJSON(data) {
    const jsonFilePath = path.join('../data/bos', 'output.json');

    // Write data to a JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Data saved to ${jsonFilePath}`);
}

const extractedData = readJSFilesAndExtractData('../data/bos/js');
const extractedData1 = readJSFilesAndExtractData('../data/bos/demo-js');

const mergeData = extractedData.concat(extractedData1)
saveDataToJSON(mergeData);
