'use strict';

module.exports = {
  db: process.env.MONGODB_URL,
  bnet: {
    clientID: process.env.BNET_ID,
    clientSecret: process.env.BNET_SECRET,
    callbackURL: 'http://localhost:3000/auth/bnet/callback'
  }
};