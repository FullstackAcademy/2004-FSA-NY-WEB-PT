const chalk = require('chalk');
const { Router } = require('express');
const { db } = require('../../db/index');

const apiRouter = Router();

Object.entries(db.models).forEach(([name, model]) => {
  apiRouter.get(`/${name}`, async (req, res) => {
    try {
      const entities = await model.findAll();

      res.send({
        [name]: entities,
      });
    } catch (e) {
      console.log(chalk.red(`Error fetching ${name} from database`));
      console.error(e);

      res.status(500).send({
        message: `Error fetching ${name} from database`,
      });
    }
  });
});

module.exports = apiRouter;
