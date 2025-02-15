const express = require('express');
const User = require('../models/user');

const router = express.Router();

// ����� ��� ��ȸ
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.render('user', { users });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// ����� ���
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

// ����� ����
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

// ����� ����
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