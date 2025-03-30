const fs = require('fs');

const readStream = fs.createReadStream('./test.py');
const writeStream = fs.createWriteStream('./test.txt');

readStream.pipe(writeStream);

