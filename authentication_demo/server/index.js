const dotenv = require('dotenv');
const chalk = require('chalk');

dotenv.config();

const { startServer } = require('./api/index');
const { sync } = require('./db/index');

const startApplication = async () => {
  const DB_ENV = process.env.DB_ENV;

  await sync(DB_ENV === 'development');

  await startServer();

  console.log(chalk.cyanBright(`Application started successfully!`));
}

startApplication();
