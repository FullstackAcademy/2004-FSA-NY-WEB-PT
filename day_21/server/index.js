const chalk = require('chalk');
const express = require('express');
const { app, startServer } = require('./api/index');
const { Pokemon, Trainer, seed } = require('./db/index');

app.use(express.json());

app.post('/pokemon', async (req, res) => {
  const { type, name } = req.body;

  if (typeof type !== 'string' || typeof name !== 'string') {
    res.status(400).send({
      message: 'Body of request must include a "type" and a "name" of type "string".',
    });
  } else {
    const createdPokemon = await Pokemon.create({
      type,
      name,
    });

    res.status(201).send({
      pokemon: createdPokemon,
      message: `Pokemon ${name} was created successfully!`,
    });
  }
});

app.put('/pokemon', async (req, res) => {
  const { id, trainerId } = req.body;

  if (typeof id !== 'string' || typeof trainerId !== 'string') {
    res.status(400).send({
      message: 'Body of request must contain an "id" and a "trainerId" of type "string".',
    });
  } else {
    try {
      const pokemon = await Pokemon.findByPk(id);

      if (!pokemon) {
        res.status(404).send({
          message: `Pokemon with ID of ${id} not found in database.`,
        });
      } else {
        const trainer = await Trainer.findByPk(trainerId);

        if (!trainer) {
          res.status(404).send({
            message: `Trainer with ID of ${trainerId} not found in database.`,
          });
        } else {
          const updatedPokemon = await pokemon.update({
            trainerId,
          }, {
            returning: true,
          });

          res.status(202).send({
            pokemon: updatedPokemon,
            message: `Pokemon ${updatedPokemon.name} was updated to belong to trainer ${trainer.name}.`,
          });
        }
      }
    } catch (e) {
      res.status(500).send({
        message: 'Internal server error while updating pokemons trainer.',
      });
    }
  }
});

app.get('/pokemon', async (req, res) => {
  const { type } = req.query;

  let pokemon;

  if (typeof type === 'string') {
    pokemon = await Pokemon.findAll({
      where: {
        type,
      },
    });
  } else {
    pokemon = await Pokemon.findAll();
  }

  res.send({
    pokemon,
  });
});

app.post('/trainer', async (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.status(400).send({
      message: 'Body of request must include a "name" of type "string".',
    });
  } else {
    const createdTrainer = await Trainer.create({
      name,
    });

    res.status(201).send({
      trainer: createdTrainer,
      message: `Pokemon ${name} was created successfully!`,
    });
  }
});

app.get('/trainer', async (req, res) => {
  const trainers = await Trainer.findAll({
    include: [Pokemon],
  });

  res.send({
    trainers,
  });
});

const startApp = () => {
  return seed()
    .then(startServer)
    .then(() => {
      console.log(chalk.greenBright('Application started successfully.'));
    })
    .catch((e) => {
      console.log(chalk.red('Failed to start application.'));

      throw e;
    });
}

startApp();
