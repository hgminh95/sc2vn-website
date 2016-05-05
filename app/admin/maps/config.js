'use strict'

module.exports = function(nga, admin) {
  var maps = admin.getEntity('maps')

  maps.listView()
    .listActions(['show', 'edit', 'delete'])
    .fields([
      nga.field('name', 'string'),
      nga.field('created_at', 'datetime'),
      nga.field('updated_at', 'datetime')
    ])

  maps.showView()
    .fields([
      nga.field('name', 'string'),
      nga.field('thumbnail', 'string'),
      nga.field('created_at', 'datetime'),
      nga.field('updated_at', 'datetime')
    ])

  maps.creationView()
    .fields([
      nga.field('name', 'string'),
      nga.field('thumbnail', 'string'),
    ])

  maps.editionView().fields(maps.creationView().fields());
}

