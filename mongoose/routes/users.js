const express = require('express');
const User = require('../schemas/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, age, married } = req.body;
    
    // Validate input
    if (!name) {
      return res.status(400).json({ message: '이름을 입력해주세요.' });
    }
    if (!age) {
      return res.status(400).json({ message: '나이를 입력해주세요.' });
    }
    if (typeof married !== 'boolean') {
      return res.status(400).json({ message: '결혼 여부를 선택해주세요.' });
    }

    const user = await User.create({
      name,
      age,
      married,
    });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

router.route('/:id')
  .get(async (req, res, next) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      res.json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .patch(async (req, res, next) => {
    try {
      const result = await User.update({
        _id: req.params.id,
      }, {
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await User.remove({ _id: req.params.id });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

// 사용자 수정 라우트
router.put('/:id', async (req, res, next) => {
    try {
        const result = await User.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true }
        );
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
