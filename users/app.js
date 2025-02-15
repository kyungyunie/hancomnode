// �ܼ� ���ڵ� ����
process.stdout.setEncoding('utf8');
if (process.platform === 'win32') {
  require('iconv-lite').encodingExists('utf8');
}

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const pool = require('./models'); // index.js�� pool�� ������

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

// pool�� ����Ϳ��� ����� �� �ֵ��� ����
app.set('pool', pool);

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} ����Ͱ� �����ϴ�.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// �����ͺ��̽� ���� �׽�Ʈ
pool.query('SELECT 1')
  .then(() => {
    console.log('�����ͺ��̽� ���� ����');
  })
  .catch((err) => {
    console.error('�����ͺ��̽� ���� ����:', err);
  });

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '�� ��Ʈ���� ��� ��');
});
