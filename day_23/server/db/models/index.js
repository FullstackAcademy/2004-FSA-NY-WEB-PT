const Pasta = require('./pastas');
const Dish = require('./dishes');
const DishPasta = require('./dish_pasta');

Pasta.belongsToMany(Dish, { through: DishPasta });
Dish.belongsToMany(Pasta, { through: DishPasta });

module.exports = {
  Pasta,
  Dish,
  DishPasta,
};
