const { User } = require('../models/User');

let auth = (req, res, next) => {

    //인증처리를 하는곳

    //1. 클라이언트 쿠키에서 토큰을 가져온다(cookie parser이용)
    //index.js에서 쿠키를 넣을때  x_auth로 넣어서 하기처럼 작성
    let token = req.cookies.x_auth; // ->쿠키를 토큰에서 가져옴

    //2. 토큰을 복호화 한후 유저를 찾는다
    //User.를 사용하기 위해 User모듈을 불러온다 맨위에 적기
    //const { User } = require('../models/User');
    //User.findByToken() 만들어줬으니까, models/User.js가서 작업해줘야함
    User.findByToken(token, (err,user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true})

        req.token = token;
        req.user = user;
        next();
    })
    //3. 유저가 있으면 인증 okay
    //4. 유저가 없으면 인증 no

}

//auth를 다른파일에 쓸수있게 정의
module.exports = { auth};