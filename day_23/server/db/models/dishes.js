const { STRING, UUID, UUIDV4, VIRTUAL } = require('sequelize');
const db = require('../db');
const Pasta = require('./pastas');

const Dish = db.define('dish', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  ingredients: {
    type: VIRTUAL,
    get: function() {
      const id = this.get('id');

      return Dish.findByPk(id, { include: [Pasta] })
        .then(({ pasta }) => pasta);
    },
  },
});

module.exports = Dish;
