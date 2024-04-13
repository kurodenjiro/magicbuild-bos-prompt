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

const extractedData = readJSFilesAndExtractData('../data/bos/components');
const extractedData1 = readJSFilesAndExtractData('../data/bos/components-with-near/near.call');
const extractedData2 = readJSFilesAndExtractData('../data/bos/components-with-near/near.view');
const extractedData3 = readJSFilesAndExtractData('../data/bos/components-with-social/social.get');
const extractedData4 = readJSFilesAndExtractData('../data/bos/components-with-social/social.set');
const extractedData5 = readJSFilesAndExtractData('../data/bos/components-with-state');
const extractedData6 = readJSFilesAndExtractData('../data/bos/function');

const mergeData = extractedData
.concat(extractedData1)
.concat(extractedData2)
.concat(extractedData3)
.concat(extractedData4)
.concat(extractedData5)
.concat(extractedData6)
saveDataToJSON(mergeData);
