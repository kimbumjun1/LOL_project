const Sequelize = require('sequelize'); //시퀄라이즈 불러옴
//env.NODE_ENV 따로 설정하지 않으면 기본값은 development이다
const env = process.env.NODE_ENV || 'development';
//config.json에 있는 development 가져옴
const config = require('../config/config')[env];
//User,Post,Hashtab 앞으로 만들 모델들
const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;

User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);

User.associate(db);
Post.associate(db);
Hashtag.associate(db);

module.exports = db;
