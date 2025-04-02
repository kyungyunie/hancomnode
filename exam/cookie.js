const http = require('http');

http.createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, { 
        'Set-Cookie': ['mycookie=jason', 'name=tommy']
    });
    res.end('333333333 Cookie');
}).listen(8085, () => {
    console.log('8085번 포트에서 서버 대기 중입니다.');
});

