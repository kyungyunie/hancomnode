const fs = require('fs');

const writeStream = fs.createWriteStream('./big.txt');

for (let i = 0; i <= 1000000; i++) {
  writeStream.write(`${i}번째 줄입니다.\n`);
}

writeStream.end();

writeStream.on('finish', () => {
  console.log('파일 쓰기 완료');
});
