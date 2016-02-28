var path = require('path');

module.exports = {
  entry: './app/admin/',
  output: {
    path: path.join(__dirname, 'public/javascripts'),
    filename: 'ng-admin.js'
  }
}