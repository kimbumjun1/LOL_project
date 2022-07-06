const express = require('express');

//팔로우는 로그인한사람만 해야하니까 isLoggedIn
const { isLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

// POST /user/1/follow -> restapi를 따름
router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {                                               //getFollowings -> 팔로잉가져오기
      await user.addFollowings([parseInt(req.params.id, 10)]); // setFollowings -> 수정할수있음 
      //addFollowings가 복수기 때문에 배열쓴다 []
      res.send('success');
    } else {
      res.status(404).send('no user');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}); 

module.exports = router;
