const dotenv = require('dotenv');
const chalk = require('chalk');

dotenv.config();

const { startServer } = require('./api/index');
const { seed, sync } = require('./db/index');

const startApplication = async () => {
  const DB_ENV = process.env.DB_ENV;

  console.log(chalk.cyan(`Application starting, env = ${DB_ENV}`));

  if (DB_ENV === 'development') {
    await seed();
  } else {
    await sync();
  }

  await startServer();

  console.log(chalk.cyanBright(`Application started successfully!`));
}

startApplication();
