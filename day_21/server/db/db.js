const Sequelize = require('sequelize');

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/2004_day_21';

const db = new Sequelize(DATABASE_URL);

module.exports = { db };
