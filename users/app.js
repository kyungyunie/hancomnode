// 콘솔 인코딩 설정
process.stdout.setEncoding('utf8');
if (process.platform === 'win32') {
  require('iconv-lite').encodingExists('utf8');
}

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const pool = require('./models'); // index.js의 pool을 가져옴

const indexRouter = require('./routes');
const usersRouter = require('./routes/users');

const app = express();
app.set('port', process.env.PORT || 3002);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// pool을 라우터에서 사용할 수 있도록 설정
app.set('pool', pool);

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// 데이터베이스 연결 테스트
pool.query('SELECT 1')
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error('데이터베이스 연결 에러:', err);
  });

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
