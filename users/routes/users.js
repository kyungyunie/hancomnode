const express = require('express');
const router = express.Router();

// 사용자 목록 조회
router.get('/', async (req, res, next) => {
  try {
    const pool = req.app.get('pool');
    const [users] = await pool.query('SELECT * FROM users');
    res.render('user', { users });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 사용자 등록
router.post('/', async (req, res, next) => {
  try {
    const pool = req.app.get('pool');
    const { name, age, married } = req.body;
    await pool.query(
      'INSERT INTO users (name, age, married) VALUES (?, ?, ?)',
      [name, parseInt(age), married === 'on' ? 1 : 0]
    );
    res.redirect('/users');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 사용자 수정
router.post('/update/:id', async (req, res, next) => {
  try {
    const pool = req.app.get('pool');
    const { name, age, married } = req.body;
    await pool.query(
      'UPDATE users SET name = ?, age = ?, married = ? WHERE id = ?',
      [name, parseInt(age), married === 'on' ? 1 : 0, req.params.id]
    );
    res.redirect('/users');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 사용자 삭제
router.get('/delete/:id', async (req, res, next) => {
  try {
    const pool = req.app.get('pool');
    await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.redirect('/users');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router; 