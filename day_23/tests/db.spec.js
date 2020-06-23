const { seed, models: { Dish, Pasta } } = require('../server/db/index');

describe('DataBase', () => {
  beforeEach(() => seed());

  it('Can fetch all pastas', async () => {
    const pastas = await Pasta.findAll();

    expect(pastas.length).toEqual(5);
  });

  it('Validates thickness is atleast 1', async () => {
    try {
      const newPasta = await Pasta.create({
        shape: 'Rigatoni',
        thickness: 0,
        flour: 'Wheat',
      });
    } catch (e) {
      expect(e.errors[0].path).toEqual('thickness');
    }
  });

  it('Validates the virtual method on dishes', async () => {
    const tPS = await Dish.findOne({
      where: {
        name: 'Tri-Pasta-Salad',
      },
    });

    const ingredients = await tPS.ingredients;

    const allShapes = ingredients.map(i => i.shape);

    const expectedShapes = ['Bow Tie', 'Penne', 'Gnocchi'];

    allShapes.forEach((shape) => {
      expect(expectedShapes.includes(shape)).toEqual(true);
    });
  });
});
