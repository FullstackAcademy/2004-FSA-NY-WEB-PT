const chalk = require('chalk');
const { db, models } = require('./models/index');

const { User } = models;

const sync = async (force = false) => {
  try {
    await db.sync({force});

    console.log(chalk.greenBright(`DB Sync successful. Force: ${force}`));
  } catch (e) {
    console.log(chalk.red(`DB Failed to sync. Force: ${force}`));
    throw e;
  }
};

const seed = async () => {
  await sync(false);

  try {
    await User.create({
      username: 'me@eliot.com',
      password: 'password123',
    });

    console.log(chalk.green(`Creating initial user successful.`));
  } catch (e) {
    console.log(chalk.red(`Creating initial user failed.`));

    throw e;
  }
};

module.exports = {
  db,
  models,
  sync,
  seed,
};
