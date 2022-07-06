const express = require('express');
const { Post, User, Hashtag } = require('../models');
const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user; //로그인했는지, 안했는지는 user변수는 모든라우터에 쓰일거라서 뺴놓음(중복제거해줌)
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  res.locals.followerIdList = req.user ? req.user.Followings.map(f => f.id) : [];
  
  next();
});

//app.js pageRouter에 /이기떄문에, router.get 앞에 /profile 이런식으로 작성
router.get('/profile', (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird' });
});

router.get('/join', (req, res) => {
  res.render('join', { title: '회원가입 - NodeBird' });
});

router.get('/', async (req, res, next) => {
  try {
      
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']],
    });
    //render에 넣는 변수들 res.locals로 뺄수있다 
    res.render('main', {
      title: 'NodeBird',
      twits: posts,
      //user: req.user,  -> res.locals.user = req.user;
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// GET /hashtag?hashtag=노드 -> 검색들어오는 로직
router.get('/hashtag', async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect('/');
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({ include: [{ model: User, attributes: ['id', 'nick'] }] });//게시글작성자까지 가져옴
      // 원래 User를 가져오면, id,닉네임,패스워드,provider 등 프론트로가져오면 
      // 해커들이 비밀번호가져갈수 있으니까
      // 프론트로 보낼때는 attributes로 필요한것만 설정해서 보내주자 
    }

    return res.render('main', {
      title: `#${query} 검색 결과| NodeBird`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
