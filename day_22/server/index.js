const dotenv = require('dotenv');

dotenv.config();

const { startServer, app } = require('./api/index');
const { models, sync } = require('./db/index');

sync(true)
  .then(startServer);
