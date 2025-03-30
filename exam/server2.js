const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    try {
        fs.readFile('./server1.html', 'utf8', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } catch (err) {
        console.error(err);
    }
}).listen(3000, () => {
    console.log('3000번 포트에서 서버 대기중입니다!');
});
