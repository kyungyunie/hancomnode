const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

// Express 앱 설정
const app = express();
app.use(express.static('public'));

// HTML 파일 제공
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// HTTP 서버 생성
const server = http.createServer(app);

// WebSocket 서버 생성 및 HTTP 서버에 연결
const wss = new WebSocket.Server({ server });

// 클라이언트 연결 관리
const clients = new Set();

// 연결 이벤트 처리
wss.on('connection', (ws) => {
  // 새 클라이언트 추가
  clients.add(ws);
  
  // 연결 시 메시지 전송
  ws.send(JSON.stringify({
    type: 'system',
    message: '채팅방에 연결되었습니다.',
    timestamp: new Date().toISOString()
  }));
  
  // 접속자 수 업데이트 전송
  broadcastUserCount();
  
  // 메시지 수신 이벤트 처리
  ws.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      
      // 수신된 메시지를 모든 클라이언트에게 브로드캐스트
      broadcastMessage({
        type: 'chat',
        username: parsedMessage.username || '익명',
        message: parsedMessage.message,
        timestamp: new Date().toISOString()
      });
    } catch (e) {
      console.error('메시지 파싱 오류:', e);
    }
  });
  
  // 연결 종료 이벤트 처리
  ws.on('close', () => {
    clients.delete(ws);
    broadcastUserCount();
    console.log('클라이언트 연결 종료');
  });
  
  // 오류 처리
  ws.on('error', (error) => {
    console.error('WebSocket 오류:', error);
    clients.delete(ws);
  });
});

// 모든 클라이언트에게 메시지 브로드캐스트
function broadcastMessage(message) {
  const messageStr = JSON.stringify(message);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(messageStr);
    }
  });
}

// 현재 접속자 수 브로드캐스트
function broadcastUserCount() {
  broadcastMessage({
    type: 'userCount',
    count: clients.size,
    timestamp: new Date().toISOString()
  });
}

// 서버 시작
const PORT = process.env.PORT || 4001;
server.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다`);
});