import { sync as globSync } from 'glob';
import fs from 'fs';

function getAllUsernames(){
    const allUsernames = [];

    const userFilePattern = './usernames/*.txt';

    const fileNames = globSync(userFilePattern); 
    fileNames.forEach((fileName) => {
        const data = fs.readFileSync(fileName, 'utf8');
        const usernames = data.trim().split('\n'); 
        allUsernames.push(...usernames);
    });

    return allUsernames;
}

function uniqueValues() {
    const files = fs.readdirSync('./usernames', 'utf8');
    const uniqueNames = new Set();
    console.time('uniqueValues');
    for (const file of files) {
        const data = fs.readFileSync(`./usernames/${file}`, 'utf8');
        const parsedData = data.split('\n');

        for (const word of parsedData) {
            uniqueNames.add(word);
        }
    }
    console.timeEnd('uniqueValues');
    return uniqueNames.size;
}

function existInAllFiles (data){
    const files = fs.readdirSync('./usernames', 'utf8');
    let newArr = [];
    let counter = 0;

    for (const file of files) {
        const data = fs.readFileSync(`./usernames/${file}`, 'utf8');
        const parsedData = data.split('\n');
        newArr.push(...Array.from(new Set(parsedData)));
    }
    console.time('existInAllFiles');

    data.reduce((accumulator, currentWord) => {
        accumulator[currentWord] = (accumulator[currentWord] || 0) + 1;
        if (accumulator[currentWord] === 20) {
            counter++;
        }
        return accumulator;
    }, {});
    console.timeEnd('existInAllFiles');
    return counter;
}

function existInAtleastTen(){
    const files = fs.readdirSync('./usernames', 'utf8');
    const newArr = [];
    let counter = 0;

    for (const file of files) {
        const data = fs.readFileSync(`./usernames/${file}`, 'utf8');
        const parsedData = data.split('\n');
        newArr.push(...Array.from(new Set(parsedData)));
    }

    console.time('existInAllFiles');
    newArr.reduce((accumulator, currentWord) => {
        accumulator[currentWord] = (accumulator[currentWord] || 0) + 1;
        if (accumulator[currentWord] === 10) {
            counter++;
        }
        return accumulator;
    }, {});
    console.timeEnd('existInAllFiles');

    return counter;
};

function run(){
    console.log('Getting all usernames...');
    const allUsernames = getAllUsernames();
    if(allUsernames.length>0){
        console.log(`Success! Found ${allUsernames.length} usernames.`);
    }
    const uniqueNames = uniqueValues();
    console.log(`Found ${uniqueNames} unique names`); //this execution takes 744.492ms
    const countExistInAllFiles = existInAllFiles(allUsernames);
    console.log(`${countExistInAllFiles} users exist in all files`);// this execution takes 417.393ms
    const countExistInAtLeastTen = existInAtleastTen();
    console.log(`Exist in at least 10 files: ${countExistInAtLeastTen}`);// this execution takes 414.513ms
}

run();