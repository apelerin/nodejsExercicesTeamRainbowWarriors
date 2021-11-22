const csv = require('fast-csv');
var ss = require('simple-statistics');


console.log(process.argv.slice(2)[0]);


const fs = require('fs');
const { rejects } = require('assert');
const file = process.argv.slice(2)[0];

// fs.readFile(file, "utf8", function (err, data) {
//     const content = data;
//     console.debug(content);
//     console.error(err);

// })

async function waitingForPromise() {
    return new Promise((resolve, rejects) => {
        const tmpCereals = [];
        fs.createReadStream(file)
        .pipe(csv.parse({delimiter: ';', headers: true, from_line: 2}))
        .on('error', error => console.error(error))
        .on('data', row => tmpCereals.push(row))
        .on('end', rowCount => {
            console.log(`Parsed ${rowCount} rows`)
            resolve(tmpCereals)
        })
    })
} 

waitingForPromise().then((value) => {
    console.log(value)

})


