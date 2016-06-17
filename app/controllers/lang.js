'use strict';

exports.set = function(req, res, next) {
  res.cookie('locale', req.query.lang);
  res.redirect(req.session.returnTo);
}
