const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello World</h1>');
  res.end('<p>Hello Server</p>');
})
    .listen(8080, () => {
        console.log('8080번 포트에서 서버 대기중입니다!');
    });


const server2 = http.createServer((req, res) => {
        res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>forbidden</h1>');
        res.end('forbidden');
      })
          .listen(3000, () => {
              console.log('3000번 포트에서 서버 대기중입니다!');
          });
        