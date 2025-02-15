const express = require('express');
const router = express.Router();

// ����� ��� ��ȸ
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

// ����� ���
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

// ����� ����
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

// ����� ����
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