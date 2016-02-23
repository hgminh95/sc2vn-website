'use strict';

module.exports = {
  db: 'mongodb://localhost/sc2vn',
  bnet: {
    clientID: process.env.BNET_ID,
    clientSecret: process.env.BNET_SECRET,
    callbackURL: 'https://localhost:3000/auth/bnet/callback'
  }
};