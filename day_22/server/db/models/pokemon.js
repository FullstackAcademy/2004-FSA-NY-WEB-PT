const { UUID, UUIDV4, STRING, ENUM } = require('sequelize');
const chalk = require('chalk');
const db = require('../db');

const TYPES = ['Water', 'Fire', 'Grass', 'Electric', 'Poison', 'Normal', 'Fighting', 'Psychic', 'Ghost', 'Flying', 'Dragon', 'Ice', 'Rock', 'Ground', 'Bug'];

const Pokemon = db.define('pokemon', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  type: {
    type: ENUM(TYPES),
    defaultValue: 'Normal',
  },
});

Pokemon.findByType = async function(type) {
  if (!TYPES.includes(type)) {
    console.log(chalk.yellow(`${type} is not a valid type. The valid types are: ${TYPES.join(', ')}`));
    return null;
  }

  return Pokemon.findAll({
    where: {
      type,
    },
  });
}

module.exports = Pokemon;
