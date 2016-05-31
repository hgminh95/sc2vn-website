'use strict';

var assign = require('object-assign');
var only = require('only');
var Tournament = require('../models/tournaments');
var Drawer = require('tournament-drawer');
var User = require('../models/users');
var Notification = require('../models/notifications');
var uploader = require('../uploaders/banner');

exports.init = function(req, res, next) {
  res.locals.breadcrumbs.push({
    name: 'Tournaments',
    address: '/tournaments'
  })

  next()
}

exports.load = function(req, res, next, id) {
  Tournament.findById(id, function(err, tournament) {
    if (err) return next(err);

    req.tournament = tournament;
    if (!req.tournament) return res.render('404');

    res.locals.breadcrumbs.push({
      name: tournament.name,
      address: tournament.getShowPath()
    })
    next();
  });
}

exports.index = function(req, res, next) {
  Tournament.find({status: 'normal'}).exec(function(err, tournaments) {
    if (err) return next(err);

    res.render('tournaments/index', {
      title: 'Tournaments',
      tournaments: tournaments
    });
  });
}

exports.new = function(req, res) {
  res.render('tournaments/new', {
    tournament: new Tournament()
  });
}

exports.create = function(req, res, next) {
  var tournament = new Tournament(only(req.body, Tournament.fields()));

  uploader.upload(tournament, req.file);

  if(req.user.role == 'admin'){
    tournament.status = 'normal'
  }
  tournament.save(function(err) {
    if (err) return next(err);

    res.redirect(tournament.getShowPath());
  });
}

exports.show = function(req, res) {
  var tournament = req.tournament
  tournament.toJson(function(err, json) {
    res.render('tournaments/show', {
      title: tournament.name,
      tournament: tournament,
      drawer: new Drawer(json)
    })
  })
}

exports.edit = function(req, res) {
  res.render('tournaments/edit', {
    title: req.tournament.name,
    tournament: req.tournament
  });
}

exports.update = function(req, res) {
  var tournament = req.tournament;

  assign(tournament, only(req.body, Tournament.fields()));

  uploader.upload(tournament, req.file);

  tournament.save(function(err) {
    if (err) return res.sendStatus(406)
    return res.json(req.body)
  })
}

exports.destroy = function(req, res) {
  req.tournament.remove();

  res.redirect('/tournaments');
}

exports.tournamentRegister = function (req, res, next) {
  var user = res.locals.current_user;
  var tournament = req.tournament;
  var ownerId = tournament.owner;
  var notification = new Notification({
    message: user.name + ' muốn đăng ký tham gia vào ' + tournament.name,
    link: '/tournaments/' + tournament._id
  });
  tournament.addPending(user);
  User.findById(ownerId, function(err, owner){
    if (err) next(err);

    console.log(tournament.registration);
    owner.addNotification(notification);
  });

  res.sendStatus(201);
}

exports.acceptUser = function(req, res) {
  var user =  req.profile
  var tournament = req.tournament;
  var notification = new Notification({
    message: ' bạn được chấp nhận tham gia vào ' + tournament.name,
    link: '/tournaments/' + tournament._id
  })

  tournament.removePending(user);
  tournament.addParticipant(user);
  user.addNotification(notification);
}

exports.denyUser = function(req, res) {
  var user =  req.profile
  var tournament = req.tournament;
  var notification = new Notification({
    message: ' bạn không được chấp nhận tham gia vào ' + tournament.name,
    link: '/tournaments/' + tournament._id
  })

  tournament.removePending(user);
  user.addNotification(notification);
}

exports.invitation = function(req, res) {
  var owner = req.user;
  var user =  req.profile
  var tournament = req.tournament;
  var notification = new Notification({
    message: owner.name + ' invite you to ' + tournament.name,
    link: '/tournaments/' + tournament._id
  });
  tournament.addPendingInvitation(user);
  user.addNotification(notification);
  res.sendStatus(201);
}

exports.acceptInvitation = function(req, res) {
  var user = req.user
  var tournament = req.tournament;
  var ownerId = tournament.owner;

  if(registrable){
    var notification = new Notification({
      message: user.name + ' accept your ivitation',
      link: '/tournaments/' + tournament._id
    });
    tournament.removePendingInvitation(user);
    tournament.addInvitation(user);

    User.findById(ownerId, function(err, owner){
      if (err) next(err);

      owner.addNotification(notification);
    });
  }

  else{
    var notification = new Notification({
      message: user.name + ' decline your ivitation',
      link: '/tournaments/' + tournament._id
    });

    User.findById(ownerId, function(err, owner){
      if (err) next(err);

      owner.addNotification(notification);
    });
  }

  res.sendStatus(201);
}

exports.declineInvitation = function(req, res) {
  var user = req.user
  var tournament = req.tournament;
  var ownerId = tournament.owner;
  var notification = new Notification({
    message: user.name + ' decline your ivitation',
    link: '/tournaments/' + tournament._id
  });

  tournament.removePendingInvitation(user);

  User.findById(ownerId, function(err, owner){
    if (err) next(err);

    owner.addNotification(notification);
  });
}

exports.addStaff = function(req, res){
  var user = req.profile;
  var owner = req.user;
  var tournament = req.tournament;

  var notification = new Notification({
    message: owner.name + ' add you as a staff of ' + tournament.name,
    link: '/tournaments/' + tournament._id
  });

  tournament.addStaff(user);
  user.addNotification(notification);
  res.sendStatus(201);
}

exports.removeStaff = function(req, res){
  var user = req.profile;
  var owner = req.user;
  var tournament = req.tournament;

  var notification = new Notification({
    message: owner.name + ' remove you from staffs of ' + tournament.name,
    link: '/tournaments/' + tournament._id
  });

  tournament.removeStaff(user);
  user.addNotification(notification);
  res.sendStatus(201);
}

exports.acceptTournament = function(req, res, next){
  if(req.user.role != 'admin') return next(new Error('Permission Denied'));
  var tournament = req.tournament;
  tournament.status = 'normal'
  tournament.save(function(err){
    if (err) return res.sendStatus(406);

    res.sendStatus(201);
  })
}

exports.declineTournament = function(req, res, next){
  if(req.user.role != 'admin') return next(new Error('Permission Denied'));
  var tournaments = req.tournament;
  tournament.remove(function(err){
    if (err) return res.sendStatus(406);

    res.sendStatus(201);
  });
}
