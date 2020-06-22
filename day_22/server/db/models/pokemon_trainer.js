const { INTEGER } = require('sequelize');
const db = require('../db');

const PokemonTrainer = db.define('pokemon_trainer', {
  level: {
    type: INTEGER,
    defaultValue: 3,
  },
});

module.exports = PokemonTrainer;
