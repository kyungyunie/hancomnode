// 콘솔 인코딩 설정
process.stdout.setEncoding('utf8');
if (process.platform === 'win32') {
  require('iconv-lite').encodingExists('utf8');
}

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const pool = require('./models'); // index.js의 pool을 가져옴
const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3003;  // 3002에서 다른 포트로 변경

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.set('pool', pool);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).render('error', {
    message: err.message,
    error: process.env.NODE_ENV !== 'production' ? err : {}
  });
});

// 데이터베이스 연결 테스트
pool.query('SELECT 1')
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is already in use. Please try another port.`);
        process.exit(1);
    }
});
