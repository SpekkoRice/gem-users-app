const express = require('express');
const Users = require('../models/users');
const router = express.Router();

router.post('/users', async (req, res, next) => {
  try {
    const user = await Users.create(req.body);
    res.send(user)
  } catch (err) {
    next(err)
  }
});

router.get('/users', async (req, res, next) => {
  try {
    const users = await Users.find(req.body);
    res.send(users);
  } catch (err) {
    next(err)
  }
});

router.get('/users/:_id', async (req, res, next) => {
  try {
    const user = await Users.findOne(req.params);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.patch('/users/:_id', async (req, res, next) => {
  try {
    const user = await Users.findOneAndUpdate({_id: req.params}, req.body, {new: true});
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.delete('/users/:_id', async (req, res, next) => {
  try {
    const results = await Users.deleteOne(req.params);
    res.send(results);
  } catch (err) {
    next(err);
  }
});

module.exports = router;