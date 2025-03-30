const fs = require('fs');

const readStream = fs.createReadStream('./big.txt', { highWaterMark: 64 });
const data = [];

readStream.on('data', (chunk) => {
    // 각 청크를 문자열로 변환하여 출력
    console.log('청크 데이터:', chunk.toString());
    data.push(chunk);
});

readStream.on('end', () => {
    console.log('\n=== 전체 데이터 ===');
    console.log(Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
    console.error('에러 발생:', err);
});

