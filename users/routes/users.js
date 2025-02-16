const express = require('express');
const router = express.Router();

// 사용자 목록 조회
router.get('/', async (req, res, next) => {
  try {
    const [users] = await req.app.get('pool').query('SELECT * FROM users');
    res.render('user', { users });
  } catch (error) {
    next(error);
  }
});

// 사용자 등록 페이지
router.get('/reg', (req, res) => {
  res.render('user-register');
});

// 사용자 등록
router.post('/', async (req, res, next) => {
  try {
    const { name, age, married } = req.body;
    await req.app.get('pool').query(
      'INSERT INTO users (name, age, married) VALUES (?, ?, ?)',
      [name, parseInt(age), married === 'on' ? 1 : 0]
    );
    res.redirect('/users');
  } catch (error) {
    next(error);
  }
});

// 사용자 수정 페이지
router.get('/edit/:id', async (req, res, next) => {
  try {
    const [users] = await req.app.get('pool').query(
      'SELECT * FROM users WHERE id = ?',
      [req.params.id]
    );
    res.render('user-edit', { user: users[0] });
  } catch (error) {
    next(error);
  }
});

// 사용자 수정
router.post('/edit/:id', async (req, res, next) => {
  try {
    const { name, age, married } = req.body;
    await req.app.get('pool').query(
      'UPDATE users SET name = ?, age = ?, married = ? WHERE id = ?',
      [name, parseInt(age), married === 'on' ? 1 : 0, req.params.id]
    );
    res.redirect('/users');
  } catch (error) {
    next(error);
  }
});

// 사용자 삭제
router.get('/delete/:id', async (req, res, next) => {
  try {
    await req.app.get('pool').query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.redirect('/users');
  } catch (error) {
    next(error);
  }
});

module.exports = router; 