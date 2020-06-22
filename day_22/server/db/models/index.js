const Pokemon = require('./pokemon');
const Trainer = require('./trainer');
const PokemonTrainer = require('./pokemon_trainer');

Pokemon.belongsToMany(Trainer, { through: PokemonTrainer });
Trainer.belongsToMany(Pokemon, { through: PokemonTrainer });

Trainer.prototype.getLineup = function() {
  return Pokemon.findAll({
    include: [{ model: Trainer, where: { id: this.id } }],
  });
}

module.exports = {
  Pokemon,
  Trainer,
  PokemonTrainer,
};
