const { STRING, INTEGER, UUID, UUIDV4 } = require('sequelize');
const db = require('../db');

const Pasta = db.define('pasta', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  shape: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  thickness: {
    type: INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  flour: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Pasta;
