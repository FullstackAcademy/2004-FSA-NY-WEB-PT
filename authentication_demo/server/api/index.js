const path = require('path');
const express = require('express');
const chalk = require('chalk');
const cookieParser = require('cookie-parser');
const app = require('./server');
const routes = require('./routes/index');
const { models: { Session, User } } = require('../db/index');

const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(__dirname, '../../public');
const DIST_PATH = path.join(__dirname, '../../dist');

app.use(cookieParser());
app.use(async (req, res, next) => {
  console.log('Cookie: ', req.cookies);

  if (!req.cookies.session_id) {
    const session = await Session.create();

    const oneWeek = 1000 * 60 * 60 * 24 * 7;

    res.cookie('session_id', session.id, {
      path: '/',
      expires: new Date(Date.now() + oneWeek),
    });

    req.session_id = session.id;

    next();
  } else {
    req.session_id = req.cookies.session_id;

    const user = await User.findOne({
      include: [
        {
          model: Session,
          where: {
            id: req.session_id,
          },
        },
      ],
    });

    console.log('Session User: ', user.get());

    if (user) {
      req.user = user;
    }

    next();
  }
});

app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));

app.use(express.json());

routes.forEach(({ path, router }) => {
  app.use(path, router);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(PUBLIC_PATH, './index.html'));
});

const startServer = () => new Promise((res) => {
  app.listen(PORT, () => {
    console.log(chalk.greenBright(`Application is now listening on PORT:${PORT}`));
    res();
  });
});

module.exports = {
  startServer,
  app,
};
