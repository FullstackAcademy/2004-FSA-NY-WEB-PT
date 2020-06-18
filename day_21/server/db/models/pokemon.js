const { STRING, UUID, UUIDV4 } = require('sequelize');
const { db } = require('../db');

const Pokemon = db.define('pokemon', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  type: {
    // ENUM - which is an array of choices a type can be.
    type: STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
});


module.exports = Pokemon;
