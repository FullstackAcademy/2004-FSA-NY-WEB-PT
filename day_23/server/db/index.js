const chalk = require('chalk');
const { Dish, Pasta, DishPasta } = require('./models/index');
const db = require('./db');

const sync = async (force = false) => {
  try {
    await db.sync({ force });
  } catch (e) {
    console.log(chalk.red('Failed to sync DB.'));
    throw e;
  }

  // console.log(chalk.green(`Synced DB successfully. Force: ${force}`));
}

const pastas = [
  {
    shape: 'Bow Tie',
    thickness: 4,
    flour: 'Semolina',
  },
  {
    shape: 'Penne',
    thickness: 3,
    flour: 'Buckwheat',
  },
  {
    shape: 'Spaghetti',
    thickness: 1,
    flour: 'Spinach',
  },
  {
    shape: 'Gnocchi',
    thickness: 3,
    flour: 'Potato',
  },
  {
    shape: 'Fussili',
    thickness: 2,
    flour: 'Cauliflower',
  },
];

const dishes = [
  {
    name: 'Tri-Pasta-Salad',
  },
  {
    name: 'Pasta Smorgasbord',
  },
];

const seed = async () => {
  await sync(true);

  const [bowTie, penne, spaghetti, gnocchi, fussili, triPastaSalad, pastaSmorg] = await Promise.all([
    ...(pastas.map(p => Pasta.create(p))),
    ...(dishes.map(d => Dish.create(d))),
  ]);

  await triPastaSalad.addPasta([bowTie, penne, gnocchi]);
  await pastaSmorg.addPasta([bowTie, penne, spaghetti, gnocchi, fussili]);
}

module.exports = {
  db,
  sync,
  seed,
  models: {
    Dish,
    Pasta,
    DishPasta,
  },
};
