'use strict';

module.exports = function(nga, admin) {
  var articles = admin.getEntity('matches');

  articles.listView()
    .listActions(['show', 'edit', 'delete'])
    .fields([
      nga.field('player_1', 'reference')
          .targetEntity(admin.getEntity('users'))
          .targetField(nga.field('name'))
          .label('Player 1'),
      nga.field('player_2', 'reference')
          .targetEntity(admin.getEntity('users'))
          .targetField(nga.field('name'))
          .label('Player 2'),
      nga.field('tournament', 'reference')
          .targetEntity(admin.getEntity('tournaments'))
          .targetField(nga.field('name'))
          .label('Tournament'),
      nga.field('created_at', 'datetime'),
      nga.field('updated_at', 'datetime')
    ]);

  articles.showView()
    .fields([
      nga.field('player_1', 'reference')
          .targetEntity(admin.getEntity('users'))
          .targetField(nga.field('name'))
          .label('Player 1'),
      nga.field('player_2', 'reference')
          .targetEntity(admin.getEntity('users'))
          .targetField(nga.field('name'))
          .label('Player 2'),
      nga.field('tournament', 'reference')
          .targetEntity(admin.getEntity('tournaments'))
          .targetField(nga.field('name'))
          .label('Tournament'),
      nga.field('date', 'datetime'),
      nga.field('games', 'embedded_list')
          .targetFields([
            nga.field('map'),
            nga.field('race1'),
            nga.field('race2'),
            nga.field('replay'),
            nga.field('status', 'choice')
              .choices([
                { value: 'win', label: 'Player 1 Win' },
                { value: 'lose', label: 'Player 2 Win' },
                { value: 'draw', label: 'Draw' },
                { value: 'not available', label: 'Not available' }
              ])
          ]),
      nga.field('created_at', 'datetime'),
      nga.field('updated_at', 'datetime')
    ]);

  articles.creationView()
    .fields([
      nga.field('player_1', 'reference')
          .targetEntity(admin.getEntity('users'))
          .targetField(nga.field('name'))
          .label('Player 1'),
      nga.field('player_2', 'reference')
          .targetEntity(admin.getEntity('users'))
          .targetField(nga.field('name'))
          .label('Player 2'),
      nga.field('tournament', 'reference')
          .targetEntity(admin.getEntity('tournaments'))
          .targetField(nga.field('name'))
          .label('Tournament'),
      nga.field('date', 'datetime'),
      nga.field('games', 'embedded_list')
          .targetFields([
            nga.field('map'),
            nga.field('race1'),
            nga.field('race2'),
            nga.field('replay'),
            nga.field('status', 'choice')
              .choices([
                { value: 'win', label: 'Player 1 Win' },
                { value: 'lose', label: 'Player 2 Win' },
                { value: 'draw', label: 'Draw' },
                { value: 'not available', label: 'Not available' }
              ])
          ])
    ]);

  articles.editionView().fields(articles.creationView().fields());
}

