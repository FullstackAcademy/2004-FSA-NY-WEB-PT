const { Router } = require('express');
const axios = require('axios');
const chalk = require('chalk');
const { models: { User, Session } } = require('../../db/index');
const { saltAndHash } = require('../../utils/index');

const apiRouter = Router();

const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_CALLBACK_URL = '/github_login';
const GITHUB_ACCESS_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_PROFILE_URL = 'https://api.github.com/user';

apiRouter.get('/github', (req, res) => {
  res.redirect(`${GITHUB_AUTH_URL}?client_id=${process.env.GITHUB_CLIENT_ID}`);
});

apiRouter.get(GITHUB_CALLBACK_URL, async (req, res) => {
  const { code } = req.query;

  try {
    const axiosRes = await axios.post(`${GITHUB_ACCESS_URL}?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`)

    const data = axiosRes.data;

    const dataKeyVals = data
      .split('&')
      .reduce((keyVals, keyValString) => {
        const [key, val] = keyValString.split('=');

        return {
          ...keyVals,
          [key]: val,
        };
      }, {});

    const mySession = await Session.findByPk(req.session_id);

    await mySession.update({
      oauth_access_token: dataKeyVals.access_token,
    });

    res.sendStatus(200);
  } catch (e) {
    console.log(chalk.red('Failed to authenticate with GitHub.'));
    console.error(e);

    res.sendStatus(500);
  }
});

apiRouter.get('/github_profile', async (req, res) => {
  const { oauth_access_token } = await Session.findByPk(req.session_id);

  if (!oauth_access_token) res.sendStatus(401);
  else {
    const profileInfo = await axios.get(GITHUB_PROFILE_URL, {
      headers: {
        Authorization: `token ${oauth_access_token}`,
        Accept: 'application/json',
      },
    });

    const { data } = profileInfo;

    console.log('Github Profile: ', data);

    res.send(data);
  }
});

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

  try {
    const session = await Session.findByPk(req.session_id)

    const createdUser = await User.create({
      username,
      password,
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

