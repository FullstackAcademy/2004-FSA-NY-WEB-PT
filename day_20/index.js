const { Client } = require('pg');
const express = require('express');

// const Client = pg.Client;

const PG_URL = process.env.PG_URL || 'postgres://localhost:5432/';
const DB_NAME = process.env.DB_NAME || '2004_day_20';
const PORT = process.env.PORT || 3000;

const db = new Client(`${PG_URL}${DB_NAME}`);

db.connect();

const createUser = async (username, password) => {
  if (typeof username !== 'string' || typeof password !== 'string') {
    throw new Error('Values must be strings for a users username and password.');
  }

  await db.query(`
    INSERT INTO users (username, password)
    VALUES ($1, $2);
  `, [username, password]);
}

const getAllUsers = async () => {
  const { rows } = await db.query(`
    SELECT id, username
    FROM users;
  `);

  return rows;
};

const login = async (username, password) => {
  const { rows } = await db.query(`
    SELECT id
    FROM users
    WHERE "username"=$1 AND "password"=$2
    LIMIT 1;
  `, [username, password]);

  return rows.length
    ? rows[0].id
    : null;
};

const seed = async (force = false) => {
  if (force) {
    await db.query(`
      DROP TABLE IF EXISTS users;
    `);
  }

  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);

  console.log('Seeding complete!');
};

// Pure SQL
// seed()
//   .then(() => createUser(
//     'eliot',
//     'password123'
//   ))
//   .then(() => getAllUsers())
//   .then((allUsers) => {
//     console.log('Successfully seeded database!', allUsers);
//   })
//   .then(() => login('eliot', 'password123'))
//   .then((loginResult) => {
//     console.log('Result of attempted login: ', loginResult);
//     db.end();
//   })
//   .catch((e) => {
//     console.error('Failed to seed!');
//     db.end();
//     throw e;
//   });

const app = express();

app.use(express.json());

app.get('/users', async (req, res) => {
  const users = await getAllUsers();

  res.send({ users });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const userId = await login(username, password);

  if (!userId) {
    res.status(401).send({
      message: 'Failed to login.',
    });
  } else {
    res.send({
      userId,
    });
  }
});

app.post('/users', async (req, res) => {
  const { username, password } = req.body;

  await createUser(username, password);

  res.send({
    message: `${username} was created!`,
  });
});

const startServer = () => new Promise((res) => {
  app.listen(PORT, () => {
    console.log(`Server is now listening on PORT:${PORT}`);
  });
});

seed(true)
  .then(startServer)
  .catch((e) => {
    console.error('Failed to start/seed!');
    db.end();
    throw e;
  });
