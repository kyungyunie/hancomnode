const fs = require('fs');

console.log('before: ', process.memoryUsage().heapUsed);

const data1 = fs.readFileSync('./big.txt', 'utf8');
fs.writeFileSync('./big.txt', data1);
console.log('buffer: ', process.memoryUsage().heapUsed);







