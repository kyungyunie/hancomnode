const http = require('http');

const server = http.createServer((req, res) => {
    const { url, method } = req;
    
    if (method === 'GET') {
      if (url === '/') {
        // 기본 페이지
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>안녕하세요! /hello?name=이름 으로 접속해보세요!</h1>');
      }
      else if (url.startsWith('/hello')) {
        // URL에서 name 파라미터 추출
        const name = new URL(req.url, 'http://localhost:8080').searchParams.get('name');
        
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        if (name) {
          res.end(`<h1>${name}님, 환영합니다!</h1>`);
        } else {
          res.end('<h1>이름을 입력해주세요!</h1>');
        }
      }
      else {
        // 404 처리
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>페이지를 찾을 수 없습니다.</h1>');
      }
    }
  }).listen(8080);
  
  console.log('8080번 포트에서 서버 실행 중...');