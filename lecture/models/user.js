const Sequelize = require('sequelize');

//mysql 테이블하고 매칭됨 -> class User extends ~~~~
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({            //시퀄라이즈는 id생략되어있음 -> primary키
      email: { 
        type: Sequelize.STRING(40),
        allowNull: true, //비어있어도됨
        unique: true, //고유해야함
      },
      nick: {
        type: Sequelize.STRING(15),
        allowNull: false, //닉네임 15글자 필수
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true, //비밀번호 선택 -> 비밀번호 없어도됨, -> 카카오 로그인할때 
      },
      //로그인제공자 
      provider: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'local', //local이 카카오면 카카오를 통해서 로그인한거다
      },
      snsId: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
    }, {
      sequelize,
      //timestamps, paranoid -> true -> createat, updateat, deleteat(생성일, 수정일, 삭제일) 기록됨
      timestamps: true, 
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Domain); //1 대 다 관계 생성
    db.User.belongsToMany(db.User, {
      foreignKey: 'followingId',
      as: 'Followers',
      through: 'Follow',
    });
    db.User.belongsToMany(db.User, {
      foreignKey: 'followerId',
      as: 'Followings',
      through: 'Follow',
    });
  }
};
