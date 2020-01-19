const express = require('express');
const users = require('../models/users');
const router = express.Router();

router.post('/users', async (req, res, next) => {
  try {
    const user = await users.create(req.body);
    res.send(user)
  } catch (err) {
    next(err)
  }
});

router.get('/users', async (req, res, next) => {
  try {
    const users = await models.find(req.body);
    res.send(users);
  } catch (err) {
    next(err)
  }
});

router.get('/users/:_id', async (req, res, next) => {
  try {
    const user = await models.findOne(req.params);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.patch('/users/:_id', async (req, res, next) => {
  try {
    const user = await models.update(req.params, req.body);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.delete('/users/:_id', async (req, res, next) => {
  try {
    const results = await models.deleteOne(req.params);
    res.send(results);
  } catch (err) {
    next(err);
  }
});

module.exports = router;