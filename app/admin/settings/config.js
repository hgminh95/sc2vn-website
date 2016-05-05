'use strict'

module.exports = function(nga, admin) {
  var settings = admin.getEntity('settings')

  settings.listView()
    .listActions(['show', 'edit'])
    .fields([
      nga.field('name').isDetailLink(true).detailLinkRoute('show')
    ])

  settings.showView()
    .fields([
      nga.field('articles_per_page', 'number'),
      nga.field('matches_per_page', 'number'),
      nga.field('recent_matches_count', 'number'),
      nga.field('top_players_count', 'number'),
      nga.field('players_per_page', 'number')
    ])

  settings.editionView().fields(settings.showView().fields())
}

