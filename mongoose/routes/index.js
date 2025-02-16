const express = require('express');
const User = require('../schemas/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});
    console.log('Found users:', users);
    res.render('index', { users });
  } catch (err) {
    console.error('Error fetching users:', err);
    next(err);
  }
});

module.exports = router;
