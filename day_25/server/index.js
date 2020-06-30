const express = require('express');
const chalk = require('chalk');
const Sequelize = require('sequelize');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/2004_day_25';

const db = new Sequelize(DATABASE_URL, {
  logging: false,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../public')));

const Person = db.define('person', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

app.get('/api/people', async (req, res) => {
  const people = await Person.findAll();

  res.send({
    people,
  });
});

app.post('/api/people', async (req, res) => {
  await Person.create(req.body);

  res.sendStatus(201);
});

const sync = async (force = false) => {
  await db.sync({ force });

  console.log(chalk.green(`DB is now synced.`));
}

const startServer = () => new Promise((res) => {
  app.listen(PORT, () => {
    console.log(chalk.green(`Server is now listening on PORT:${PORT}`));
    res();
  });
});

sync()
  .then(startServer);
