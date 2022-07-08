//mogoose 모듈가져오기
const mongoose = require('mongoose');

//Bcrypt 모듈 가져오기
const bcrypt = require('bcrypt');
const saltRounds = 10; //salt가 몇글자인지 나타냄

//jsonwebtoken모듈 가져오기
const jwt = require('jsonwebtoken');

//스키마 생성
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength:50
    },
    email: {
        type: String,
        trim: true, //trim은 rlawls 123 -> 스페이스공백을 없애주는 역할을 함
        unique: 1 //같은 이메일 못쓰게 설정
    },
    password: {
        type: String,
        minlength:5
    },
    lastname: {
        type: String,
        maxlength:50
    },
    //role 주는 이유-> 관리자가 될수도 있고, 일반유저가 될수 있게 구분
    role:{
        type: Number, //Number 1이면관리자, 0이면 일바유저
        default: 0
    },
    image: String,
    token: {    //유효성검사를 하기위해 token 테이블추가
        type: String
    },
    tokenExp: {  //토근사용할수있는 유효기간
        type: Number

    }

});

userSchema.pre('save', function(next){
    var user = this;

    //패스워드가 변경될때만, bcrypt를 이용해 암호화를 해준다
    if(user.isModified('password')){
    
    //비밀번호를 암호화 시킨다
    bcrypt.genSalt(saltRounds,function(err, salt){
        if(err) return next(err)

        bcrypt.hash(user.password,salt,function(err, hash){
            if(err) return next(err)
            user.password = hash;
            next();
            })
        })
    } 
    else {
        next();
    }

   
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    //plainPassword 12345 === 암호화된 비밀번호$123123cvcdfd
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch)//에러가없다 = null, 비밀번호같다 = isMatch -> true
    })
}

userSchema.methods.generateToken = function(cb){

    var user = this;
    //jsonwebtoken을 이용해서 token을 생성하기

    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function ( token,cb ) {
    var user = this;

    //토큰을 decode 한다
    jwt.verify(token,'secretToken', function(err,decoded) {
        //유저 아이디를 이용해서 유저를 찾은 다음
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        //findone은 mongoDB에 있는 메소드
        user.findOne({"_id" : decoded, "token": token}, function(err, user){

            if(err) return cb(err);
            cb(null, user)
        })

    })
 
}


//상기만든 스키마를 models로 감싸줌
const User = mongoose.model('User',userSchema); //User:모델이름, 스키마이름 적기

//models을 다른파일에서 쓰기위해 exports
module.exports = { User };