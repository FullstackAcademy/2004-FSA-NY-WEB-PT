const { STRING, UUID, UUIDV4 } = require('sequelize');
const db = require('./db');
const { saltAndHash } = require('../../utils/index');

const User = db.define('user', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {
  hooks: {
    beforeCreate(attributes) {
      attributes.password = saltAndHash(attributes.password);
    },
  }
});

module.exports = User;
