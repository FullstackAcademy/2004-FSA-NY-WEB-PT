const { INTEGER, STRING, UUID, UUIDV4 } = require('sequelize');
const db = require('../db');

const Trainer = db.define('trainer', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  badges: {
    type: INTEGER,
    defaultValue: 0,
    validate: {
      max: 8,
      min: 0,
    },
  },
});

module.exports = Trainer;
