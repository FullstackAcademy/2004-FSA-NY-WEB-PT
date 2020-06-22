const chalk = require('chalk');
const { Pokemon, Trainer } = require('./models/index');
const db = require('./db');

const startingPokemon = [
  {
    name: 'Bulbasaur',
    type: 'Grass',
  },
  {
    name: 'Squirtle',
    type: 'Water',
  },
  {
    name: 'Charmander',
    type: 'Fire',
  },
  {
    name: 'Pikachu',
    type: 'Electric',
  },
  {
    name: 'Eevee',
    type: 'Normal',
  },
];

const startingTrainers = [
  {
    name: 'Gary',
    badges: 0,
  },
  {
    name: 'Ash Ketchum',
    badges: 0,
  },
];

const seedDevData = async () => {
  const createdPokemon = await Promise.all(startingPokemon.map(pokemon => Pokemon.create(pokemon)));
  await Promise.all(startingTrainers.map(trainer => Trainer.create(trainer)));

  const ash = await Trainer.findOne({
    where: {
      name: 'Ash Ketchum',
    },
  });

  const gary = await Trainer.findOne({
    where: {
      name: 'Gary',
    },
  });

  const eevee = await Pokemon.findOne({
    where: {
      name: 'Eevee',
    },
  });

  await ash.addPokemons(createdPokemon);
  await gary.addPokemons([eevee]);

  // const ashesLineup = await ash.getLineup();
  //
  // console.log('Ashes Lineup: ', ashesLineup.map(lineupPokemon => lineupPokemon.get()));

  // const electricPokemon = await Pokemon.findByType('Electric');
  // console.log(electricPokemon.map(elPokemon => elPokemon.get()));

  console.log(chalk.cyan(`Seeded developer data.`));
}

const sync = async (force = false) => {
  try {
    await db.sync({ force });

    if (force) {
      await seedDevData();
    }

    console.log(chalk.green(`Database synced successfully! Force: ${force}`));
  } catch (e) {
    console.log(chalk.red(`Database failed to sync.`));
    throw e;
  }
}

module.exports = {
  models: {
    Pokemon,
    Trainer,
  },
  db,
  sync,
};
