const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

//로그인한 사람이 회원가입하면 안되니까 isNotLoggedIn써주자
//즉 로그인 안한사람들만 접근할수있게 추가해주자
router.post('/join',isNotLoggedIn, async (req, res, next) => {
 
  const { email, nick, password } = req.body;
 
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect('/join?error=exist'); //있으면 프론트에서 알림해줘야함 -> 이미가입한 이메일입니다 이런식으로
    }
    const hash = await bcrypt.hash(password, 12); //12는 얼마나 복잡하게 해시할건지를 나타냄 -> 숫자클수록 오래걸림 -> 해킹위험적음
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

//미들웨어 확장하는 패턴
//프론트에서 서버로 로그인요청을 보낼때 하기코드 라우터에 걸린다
// post -> authlogin을 하게 되면, 하기코드 실행됨
// passport.authenticate('local' -> 이부분 로컬이 실행되면, passport가 localStrategy를 찾는다
// passport폴더 -> index.js에 local();로 등록해줌
// local(); 등록을 해줘서 하기코드 router.post ~~~ 실행됨
// 프론트에서 로그인을 누를때, 이메일과비밀번호 같이보내줌

//로그인라우터도, 로그인 안한사람들만 할수있게 해줌
router.post('/login',isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
      if (authError) {
        console.error(authError);
        return next(authError);
      }
      if (!user) {
        return res.redirect(`/?loginError=${info.message}`);
      }
 
      return req.login(user, (loginError) => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        
        return res.redirect('/');
      });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
  });


router.get('/logout', isLoggedIn, (req, res) => {
    req.logout(()=>{
      req.session.destroy();
      res.redirect('/');
    });
   
  });

  
  
//카카오 누르기하면, passport.authenticate('kakao')실행됨 -> 실행되면 kakaoStrategy.js로 이동
router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});


module.exports = router;
