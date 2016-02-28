'use strict';

module.exports = function(nga, admin) {
  var users = admin.getEntity('users');
  
  users.identifier(nga.field('bnet_id'));
  
  users.listView().fields([
    nga.field('name').isDetailLink(true).detailLinkRoute('show'),
    nga.field('bnet_id'),
    nga.field('email', 'email'),
    nga.field('access_token'),
    nga.field('score'),
    nga.field('created_at', 'datetime'),
    nga.field('updated_at', 'datetime')
  ]);
  
  users.showView().fields([
    nga.field('name'),
    nga.field('bnet-id'),
    nga.field('email', 'email'),
    nga.field('access_token'),
    nga.field('score'),
    nga.field('created_at', 'datetime'),
    nga.field('updated_at', 'datetime')
  ]);
  
  users.creationView().fields([
    nga.field('name'),
    nga.field('bnet_id').label('Battle.net ID'),
    nga.field('email', 'email')
  ]);
  
  users.editionView().fields(users.creationView().fields());
}

