'use strict';

module.exports = function(nga, admin) {
  var users = admin.getEntity('users');

  users.listView().fields([
    nga.field('name').isDetailLink(true).detailLinkRoute('show'),
    nga.field('race'),
    nga.field('score'),
    nga.field('created_at', 'datetime'),
    nga.field('updated_at', 'datetime')
  ]);

  users.showView().fields([
    nga.field('name'),
    nga.field('bnet_id'),
    nga.field('email', 'email'),
    nga.field('access_token'),
    nga.field('score'),
    nga.field('race'),
    nga.field('created_at', 'datetime'),
    nga.field('updated_at', 'datetime')
  ]);

  users.creationView().fields([
    nga.field('password'),
    nga.field('name'),
    nga.field('bnet_id').label('Battle.net ID'),
    nga.field('email', 'email'),
    nga.field('score'),
    nga.field('race', 'choice')
        .choices([
          { value: 'terran', label: 'Terran' },
          { value: 'zerg', label: 'Zerg' },
          { value: 'protoss', label: 'Protoss' },
          { value: 'random', label: 'Random' }
        ])
  ]);

  users.editionView().fields(users.creationView().fields());
}

