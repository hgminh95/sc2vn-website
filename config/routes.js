'use strict';

var users = require('../app/controllers/users');

module.exports = function(app) {
  
  // User Routes
  app.get('/users', users.index);
  
};