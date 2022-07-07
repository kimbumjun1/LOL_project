const Sequelize = require('sequelize');

module.exports = class Domain extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      //9장에서 카카오웹플랫폼에 등록한 도메인 생각하자        
      host: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('free', 'premium'),
        allowNull: false,
      },
      //9장에서 카카오연동할때, 카카오developer에서 키를 줬음//
      //restapi키 등등 -> 그런 키를 발급해줄거다.
      clientSecret: {
        type: Sequelize.STRING(36),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: 'Domain',
      tableName: 'domains',
    });
  }

  static associate(db) {
    db.Domain.belongsTo(db.User);
  }
};
