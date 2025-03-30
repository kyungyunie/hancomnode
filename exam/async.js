const fs = require('fs');

console.log('=== 비동기식 파일 읽기 ===');
console.log('시작');

fs.readFile('./test.py', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('1번', data.toString());
});

fs.readFile('./test.py', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('2번', data.toString());
});

fs.readFile('./test.py', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('3번', data.toString());
});
