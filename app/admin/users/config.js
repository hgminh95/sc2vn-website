'use strict';

module.exports = function(nga, admin) {
  var users = admin.getEntity('users');

  users.listView()
    .listActions(['show', 'edit', 'delete'])
    .fields([
      nga.field('name').isDetailLink(true).detailLinkRoute('show'),
      nga.field('race'),
      nga.field('score'),
      nga.field('created_at', 'datetime'),
      nga.field('updated_at', 'datetime')
    ]);

  users.showView()
    .fields([
      // Authentication fields
      nga.field('email', 'email'),
      nga.field('password', 'password'),
      nga.field('bnet_id'),
      nga.field('access_token'),

      // Basic Information fields
      nga.field('name'),
      nga.field('avatar'),
      nga.field('race'),
      nga.field('clan', 'reference')
          .targetEntity(admin.getEntity('clans'))
          .targetField(nga.field('name')),
      nga.field('introduction'),
      nga.field('role', 'choice'),

      nga.field('notifications', 'embedded_list')
          .targetFields([
            nga.field('message'),
            nga.field('link'),
            nga.field('icon')
          ]),

      // Statistics fields
      nga.field('score'),
      nga.field('rank'),
      nga.field('stats.vs_zerg_games'),
      nga.field('stats.vs_protoss_games'),
      nga.field('stats.vs_terran_games'),
      nga.field('stats.vs_zerg_wins'),
      nga.field('stats.vs_protoss_wins'),
      nga.field('stats.vs_terran_wins'),
      nga.field('created_at', 'datetime'),
      nga.field('updated_at', 'datetime')
    ]);

  users.creationView()
    .fields([
      // Authentication fields
      nga.field('email', 'email'),
      nga.field('password', 'password'),
      nga.field('bnet_id').label('Battle.net ID'),

      // Basic Information fields
      nga.field('name'),
      nga.field('clan', 'reference')
          .targetEntity(admin.getEntity('clans'))
          .targetField(nga.field('name')),
      nga.field('avatar'),
      nga.field('race', 'choice')
          .choices([
            { value: 'terran', label: 'Terran' },
            { value: 'zerg', label: 'Zerg' },
            { value: 'protoss', label: 'Protoss' },
            { value: 'random', label: 'Random' }
          ]),
      nga.field('introduction', 'wysiwyg'),
      nga.field('role', 'choice')
          .choices([
            { value: 'admin', label: 'admin' },
            { value: 'moderator', label: 'moderator' },
            { value: 'user', label: 'user' }
          ]),

      // Notifications
      nga.field('notifications', 'embedded_list')
          .targetFields([
            nga.field('message'),
            nga.field('link'),
            nga.field('icon')
          ])
    ]);

  users.editionView().fields(users.creationView().fields());
}

