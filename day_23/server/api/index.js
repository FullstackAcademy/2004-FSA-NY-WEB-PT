const express = require('express');
const chalk = require('chalk');
const { sync, models: { Pasta, Dish } } = require('../db/index');

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/pasta', async (req, res) => {
  const pastas = await Pasta.findAll();

  res.send({
    pastas,
  });
});

const startServer = () => new Promise((res) => {
  app.listen(PORT, () => {
    console.log(chalk.greenBright(`Server is now listening on PORT:${PORT}`));
    res();
  });
});

module.exports = {
  app,
  startServer,
};
