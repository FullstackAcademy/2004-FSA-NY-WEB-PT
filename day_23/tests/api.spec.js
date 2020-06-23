const supertest = require('supertest');
const { app } = require('../server/api/index');
const { seed, models: { Pasta, Dish } } = require('../server/db/index');

const superApp = supertest(app);

describe('Server', () => {
  beforeEach(() => seed());

  it('Gets pasta correctly', async () => {
    const response = await superApp.get('/pasta');

    const expressPastas = response.body.pastas.map(p => p.id);

    const pastas = await Pasta.findAll();

    const dbPastas = pastas.map(p => p.id);

    expect(dbPastas.length === expressPastas.length).toBeTruthy();

    dbPastas.forEach((dP) => {
      expect(expressPastas.includes(dP)).toBeTruthy();
    });
  });
});
