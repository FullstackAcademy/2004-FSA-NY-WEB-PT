const { INTEGER, STRING, UUID, UUIDV4 } = require('sequelize');
const { db } = require('../db');

const Trainer = db.define('trainer', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  badges: {
    type: INTEGER,
    defaultValue: 0,
  },
});

module.exports = Trainer;
