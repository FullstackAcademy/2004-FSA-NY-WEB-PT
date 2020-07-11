const { Router } = require('express');
const { models: { User, Session } } = require('../../db/index');

const apiRouter = Router();

apiRouter.post('/login', async (req, res) => {
  console.log('Login Request: ', req.body);

  const { username, password } = req.body;

  const user = await User.findOne({
    where: {
      username,
      password,
    },
  });

  if (!user) {
    res.sendStatus(401);
  } else {
    console.log('Session ID: ', req.session_id);

    const usersSession = await Session.findByPk(req.session_id);

    await usersSession.setUser(user);

    res.sendStatus(200);
  }
});

apiRouter.get('/whoami', (req, res) => {
  if (req.user) {
    res.send(`
      <h3> You are ${req.user.username} and you registered with us on ${new Date(req.user.createdAt)} </h3>
    `);
  } else {
    res.send(`
      <h3> You are not logged in with our system. </h3>
    `);
  }
});

module.exports = {
  path: '/api',
  router: apiRouter,
};

