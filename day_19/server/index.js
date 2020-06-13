const express = require('express');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const readFileP = (path) => {
  return new Promise((res, rej) => {
    fs.readFile(path, (err, data) => {
      if (err) rej(err);
      else res(JSON.parse(data.toString()));
    });
  });
};

const writeFileP = (path, data) => {
  return new Promise((res, rej) => {
    fs.writeFile(path, JSON.stringify(data), (err) => {
      if (err) rej(err);
      else res();
    });
  });
}

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware is any function in express that intercepts a request, and performs some sort of action on it, or based on it. It then allows the request to move forward in the express pipeline.

const DB_PATH = path.join(__dirname, './pokemon.json');

// Logging middleware
app.use((req, res, next) => {
  console.log(chalk.cyan(`Request made to: ${req.path}`));

  next();
});

app.use(express.static(path.join(__dirname, '../dist')));

// JSON Middleware
app.use(express.json());

// Data Layer Middleware
app.use((req, res, next) => {
  readFileP(DB_PATH)
    .then(data => {
      req.pokemon = data;
      next();
    });
});

app.get('/pokemon', (req, res) => {
  res.send({
    pokemon: req.pokemon,
  });
});

app.get('/pokemon/:name', (req, res) => {
  const { name } = req.params;

  res.send({
    selectedPokemon: req.pokemon[name]
      ? {
        name: name,
        ...req.pokemon[name],
      }
      : null
  });
});

app.post('/pokemon/:name', (req, res) => {
  const { name } = req.params;
  const { type, level } = req.body;

  if (req.pokemon[name]) {
    res.status(400).send({
      message: `Pokemon ${name} already exists in Pokedex.`,
    });
  } else if (typeof type !== 'string' || typeof level !== 'number') {
    res.status(400).send({
      message: 'Body of request must contain a "level" of type "number" and a "type" of type "string"',
    });
  } else {
    const newPokedex = {
      ...req.pokemon,
      [name]: {
        type,
        level,
      },
    };

    writeFileP(DB_PATH, newPokedex)
      .then(() => {
        res.send({
          message: `Pokemon ${name} added to Pokedex!`,
        });
      });
  }
});

app.delete('/pokemon/:name', (req, res) => {
  const { name } = req.params;

  if (!req.pokemon[name]) {
    res.status(400).send({
      message: `Pokemon ${name} does not exist in Pokedex!`,
    });
  } else {
    delete req.pokemon[name];

    writeFileP(DB_PATH, req.pokemon)
      .then(() => {
        res.send({
          message: `Pokemon ${name} removed from Pokedex!`,
        });
      });
  }
});

app.put('/pokemon/:name', (req, res) => {
  const { name } = req.params;
  const { type, level } = req.body;

  if (!req.pokemon[name]) {
    res.status(400).send({
      message: `Pokemon ${name} does not exist in Pokedex!`,
    });
  } else if (!type && !level) {
    res.status(400).send({
      message: `Must include either a type or level to be updated in the request.`,
    });
  } else {
    const updatedPokedex = {
      ...req.pokemon,
      [name]: {
        type: type || req.pokemon[name].type,
        level: level || req.pokemon[name].level,
      },
    };

    writeFileP(DB_PATH, updatedPokedex)
      .then(() => {
        res.send({
          message: `Pokemon ${name} has been updated in our Pokedex!`,
        });
      });
  }
})

// Not Found Middleware (not working for some reason)
app.use((req, res, next) => {
  res.send({
    message: `Webpage not found at ${req.path}`,
  });
});

// Error Middleware
app.use((err, req, res, next) => {
  console.log('Hit Error Middleware!');

  res.send({
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(chalk.green(`Server is now listening on PORT:${PORT}`));
});

// Express Simplified Source Code

// const registeredHandlers = [];
//
// http.createServer((req, res) => {
//   for (let i = 0; i < registeredHandlers.length; ++i) {
//     const currentRoute = registeredHandlers[i];
//
//     if (req.url === currentRoute.path && req.method === currentRoute.method) {
//       const sent = currentRoute.cb(req, res);
//
//       if (sent) break;
//     }
//   }
// }).listen(PORT);
