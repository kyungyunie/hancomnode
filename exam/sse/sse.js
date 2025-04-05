const express = require('express');
const app = express();
const PORT = 3000;

// 정적 파일 제공
app.use(express.static('public'));

// SSE 엔드포인트
app.get('/events', (req, res) => {
  // SSE 설정
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  // 클라이언트에 초기 연결 메시지 전송
  res.write('data: {"message": "연결되었습니다"}\n\n');
  
  // 1초마다 현재 시간 전송
  const intervalId = setInterval(() => {
    const data = {
      time: new Date().toLocaleTimeString()
    };
    
    // 이벤트 타입과 함께 데이터 전송
    res.write(`event: update\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 1000);
  
  // 클라이언트 연결이 끊어지면 인터벌 정리
  req.on('close', () => {
    clearInterval(intervalId);
    console.log('클라이언트 연결 종료');
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`SSE 서버가 포트 ${PORT}에서 실행 중입니다`);
});