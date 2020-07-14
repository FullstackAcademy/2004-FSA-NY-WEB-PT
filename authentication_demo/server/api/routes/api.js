const { Router } = require('express');
const { models: { User, Session } } = require('../../db/index');
const { saltAndHash } = require('../../utils/index');

const apiRouter = Router();

apiRouter.post('/login', async (req, res) => {
  console.log('Login Request: ', req.body);

  const { username, password } = req.body;

  const user = await User.findOne({
    where: {
      username,
      password: saltAndHash(password),
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
    res.send({
      username: req.user.username,
      loggedIn: true,
    });
  } else {
    res.send({
      username: null,
      loggedIn: false,
    });
  }
});

apiRouter.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = saltAndHash(password);

  try {
    const session = await Session.findByPk(req.session_id)

    const createdUser = await User.create({
      username,
      password: hashedPassword,
    });

    await session.setUser(createdUser);

    res.sendStatus(201);
  } catch (e) {
    res.status(401).send({
      message: 'Cannot create a user with an already taken username.',
    });
  }
})

module.exports = {
  path: '/api',
  router: apiRouter,
};

