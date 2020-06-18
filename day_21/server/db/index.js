const chalk = require('chalk');
const { db } = require('./db');
const { Pokemon, Trainer } = require('./models');

Pokemon.belongsTo(Trainer);
Trainer.hasMany(Pokemon);

const seed = async (force = false) => {
  try {
    await db.sync({ force });

    console.log(chalk.green(`DB successfully connected, and synced. Force: ${force}`));
  } catch (e) {
    console.log(chalk.red('Error while connecting to database.'));

    throw e;
  }
};

module.exports = {
  db,
  seed,
  Pokemon,
  Trainer,
};
