const chalk = require('chalk');
const express = require('express');
const path = require('path');

const PORT = 3000;

const app = express();

app.use(express.static(path.join(__dirname, '../client')));

app.get('/best_dog', (req, res) => {
  res.send({
    name: 'Winston',
  });
});

app.listen(PORT, () => {
  console.log(chalk.green(`Server is now listening on PORT:${PORT}`));
});
