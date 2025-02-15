const express = require('express');
const User = require('../models/user');

const router = express.Router();

// 사용자 목록 조회
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.render('user', { users });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 사용자 등록
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      age: parseInt(req.body.age),
      married: req.body.married === 'on',
    });
    res.redirect('/users');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 사용자 수정
router.post('/update/:id', async (req, res, next) => {
  try {
    await User.update({
      name: req.body.name,
      age: parseInt(req.body.age),
      married: req.body.married === 'on',
    }, {
      where: { id: req.params.id }
    });
    res.redirect('/users');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 사용자 삭제
router.get('/delete/:id', async (req, res, next) => {
  try {
    await User.destroy({
      where: { id: req.params.id }
    });
    res.redirect('/users');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router; 