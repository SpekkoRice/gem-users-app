const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const { connectDb } = require('./db');
const models = require('./db');
const cors = require('cors');
const config = require('./config/config.js');

let app;

process.env.NODE_ENV = 'development';

const main = async () => {
  await connectDb();

  app = express();
  app.use(bodyParser.json());
  app.use(cors({ origin: '*' }));
  app.use('/', usersRoutes);

  app.listen(global.gConfig.node_port);
};

if (!module.parent) main().then(console.log, console.log);

module.exports = app;