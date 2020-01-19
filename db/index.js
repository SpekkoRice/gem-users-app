const mongoose = require('mongoose');
const Users = require('../models/users');

const connectDb = async () => {
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);
  return mongoose.connect(global.gConfig.database, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) 
};

const models = { Users };

module.exports = models;
module.exports = { connectDb };