const express = require('express');
const chalk = require('chalk');

const app = express();

const PORT = process.env.PORT || 3000;

const startServer = () => new Promise((res) => {
  app.listen(PORT, () => {
    console.log(chalk.green(`Server is now listening on PORT:${PORT}`));
    res();
  });
});

module.exports = {
  app,
  startServer,
};
