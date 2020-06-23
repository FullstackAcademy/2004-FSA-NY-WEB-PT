const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/2004_day_23', {
  logging: false,
});

module.exports = db;
