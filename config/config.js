'use strict';

var path = require('path');
var extend = require('util')._extend;

var development = require('./env/development');
var test = require('./env/test');
var production = require('./env/production');

var defaults = {
  root: path.join(__dirname, '..')
};

module.exports = {
  development: extend(development, defaults),
  test: extend(development, defaults),
  production: extend(production, defaults)
}[process.env.NODE_ENV || 'development'];