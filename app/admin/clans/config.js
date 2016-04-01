'use strict'

module.exports = function(nga, admin) {
  var clans = admin.getEntity('clans')

  clans.listView()
    .listActions(['show', 'edit', 'delete'])
    .fields([
      nga.field('name'),
      nga.field('owner', 'reference')
        .targetEntity(admin.getEntity('users'))
        .targetField(nga.field('name')),
      nga.field('created_at', 'datetime'),
      nga.field('updated_at', 'datetime')
    ])

  clans.showView()
    .fields([
      nga.field('name'),
      nga.field('owner', 'reference')
          .targetEntity(admin.getEntity('users'))
          .targetField(nga.field('name')),
      nga.field('banner'),
      nga.field('introduction', 'wysiwyg'),
      nga.field('members', 'referenced_list')
          .targetEntity(admin.getEntity('users'))
          .targetField('name'),
      nga.field('created_at', 'datetime'),
      nga.field('updated_at', 'datetime')
    ])

  clans.creationView()
    .fields([
      nga.field('name'),
      nga.field('owner', 'reference')
          .targetEntity(admin.getEntity('users'))
          .targetField(nga.field('name')),
      nga.field('banner'),
      nga.field('introduction', 'wysiwyg'),
      nga.field('members', 'referenced_list')
          .targetEntity(admin.getEntity('users'))
          .targetField('name')
    ])

  clans.editionView().fields(clans.creationView().fields())
}

