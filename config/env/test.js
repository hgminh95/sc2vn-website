'use strict';

module.exports = {
  db: 'mongodb://localhost/sc2vn-test',
  bnet: {
    clientID: process.env.BNET_ID || 'sample_id',
    clientSecret: process.env.BNET_SECRET || 'sample_secret',
    callbackURL: 'https://localhost:3000/auth/bnet/callback'
  }
};
