const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');


//applicaion/x-www-form-urlencoded -> 이런 데이터분석해서 가져올수있게해줌
app.use(bodyParser.urlencoded({extended: true}));
//applicaion/json타입으로 된걸 분석해서 가져올수있게 해줌
app.use(bodyParser.json());
//쿠키파써 사용
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('mogodb connected'))
  .catch(err => console.log(err))  

app.get('/', (req, res) => {
  res.send('Hello World!')
});

//라우터 endpoint /register
app.post('api/users/register',(req, res) => {
    //회원가입할때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터베이스에 넣어줌 -> models/User.js를 가져와야함

    //회원가입창에 있는 정보들 데이터베이스에 넣기위한 작업
    /*
    req.body 안에는 json형식으로
    {
        id: "jinkim",
        password: "1234"
    }   
    이런식으로 req.body에 들어있는것이다.
    이렇게 req.body에 들어있을수 있게해주는게 bodyParser가 있어서 가능함
    */    
    const user = new User(req.body);

    //mongodb에서 오는 메소드
    //req.body에서 온 정보가 user모델에 저장이 됨
    //저장할때 에러가 있다고 하면, 클라이언트에 에러있다고 전달해줘야함
    //전달할때 json형식으로 전달해주고, err 메시지도 전달
    //성공을 할경우 status200을 json형식으로 전달
    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({ 
            sucess: true 
        })
    })

})

//로그인라우터
app.post('api/users/login',(req, res) => {
    //요청된 이메일을 데이터베이스에 있는지 찾는다
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다"
            })
        }
        //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인
        //comparPassword라는 메소드를 만듬
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다"})
            //비밀번호 까지 맞다면 토큰을 생성하기
            //generateToken 매소드를 만들어줌 -> models/User.js에 만들어줘야함
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                    //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 등등
                    //쿠키에 저장을할거다 npm install cookie-parser --save 패키지설치
                    res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id })


            })    

        })
    })
})

//Auth라우터생성
//auth라는 미들웨어 추가
//미들웨어란 엔드포인트에서(/api/users/auth) request를 받은다음에
//(req, res)콜백function 하기 전에 중간에서 해주는역할
app.get('/api/users/auth',auth,(req, res) => {
    //여기까지 미들웨어를 통과해 왔다는 이야기는 Authentication이 True 라는 말
    res.status(200).json({
        _id: req.user._id,
        //role 0 -> 일반유저 , role 0이 아니면 관리자
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image:req.user.image
    })    

})

//로그아웃 라우터
//로그아웃 전에는 로그인된 상태니까 auth미들웨어 넣어줌
app.get("/api/users/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});
    




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});