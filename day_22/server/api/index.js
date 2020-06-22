const express = require('express');
const path = require('path');
const chalk = require('chalk');
const { api } = require('./routers/index');

const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(__dirname, '../../public');
const DIST_PATH = path.join(__dirname, '../../dist');

const app = express();

app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));

app.use('/api', api);

const startServer = () => new Promise((res) => {
  app.listen(PORT, () => {
    console.log(chalk.greenBright(`Server is now listening on PORT:${PORT}`));
  });
});

module.exports = {
  app,
  startServer,
};
