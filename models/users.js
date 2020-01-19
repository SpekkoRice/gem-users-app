const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const passwordValidationError = "Password needs to have at least 8 characters";

const createMongooseError = (message, code) => {
  const error = new mongoose.mongo.MongoError(message);
  error.code = code;
  return error;
};

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {timestamps: true});

usersSchema.pre("save", function(next) {
  const user = this;
  return new Promise(async (resolve, reject) => {
    if (user.isModified("password")) {
      if (user.password.length < 8) return reject(createMongooseError(passwordValidationError, 51001));
      user.password = await bcrypt.hash(user.password, 10).catch(reject);
    }
    next();
    resolve();
  });
});

usersSchema.pre("findOneAndUpdate", function(next) {
  return new Promise(async (resolve, reject) => {
    const update = this.getUpdate();
    if (update.password) {
      if(update.password.length < 8) return reject(createMongooseError(passwordValidationError, 51001));
      update.password = await bcrypt.hash(update.password, 10).catch(reject);
    }
    next();
    resolve();
  });
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;