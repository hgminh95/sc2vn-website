'use strict';

var express = require('express');

var users = require('../app/controllers/api/users');

var router = express.Router();

router.param('userId', users.load)

router.get('/users', users.index);
router.post('/users', users.create);
router.get('/users/:userId', users.show);
router.put('/users/:userId', users.update)
router.delete('/users/:userId', users.destroy);

module.exports = function(app) {
  app.use('/api', router);
}