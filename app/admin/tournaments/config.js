'use strict';

module.exports = function(nga, admin) {
  var tournaments = admin.getEntity('tournaments');

  tournaments.listView()
    .listActions(['show', 'edit', 'delete'])
    .fields([
      nga.field('name').isDetailLink(true).detailLinkRoute('show'),
      nga.field('owner', 'reference')
          .targetEntity(admin.getEntity('users'))
          .targetField(nga.field('name'))
          .label('Owner'),
      nga.field('created_at', 'datetime'),
      nga.field('updated_at', 'datetime')
    ]);

  tournaments.showView()
    .fields([
      nga.field('name'),
      nga.field('owner', 'reference')
          .targetEntity(admin.getEntity('users'))
          .targetField(nga.field('name'))
          .label('Owner'),
      nga.field('banner'),
      nga.field('introduction', 'wysiwyg'),
      nga.field('rule', 'wysiwyg'),
      nga.field('faq', 'wysiwyg'),
      nga.field('staffs', 'referenced_list')
          .targetEntity(admin.getEntity('users'))
          .targetField(nga.field('name'))
          .label('Staffs'),

      // Registration
      nga.field('registrable', 'boolean'),
      nga.field('startDate', 'date'),
      nga.field('endDate', 'date'),
      nga.field('inforRequire', 'string')
        .label('Required Information'),

      // Inivitation


      // Schedule
      nga.field('stages', 'embedded_list')
        .targetFields([
          nga.field('name')
        ]),

      nga.field('created_at', 'datetime'),
      nga.field('updated_at', 'datetime')
    ]);

  tournaments.creationView()
    .fields([
      nga.field('name'),
      nga.field('owner', 'reference')
          .targetEntity(admin.getEntity('users'))
          .targetField(nga.field('name'))
          .label('Owner'),
      nga.field('banner'),
      nga.field('introduction', 'wysiwyg'),
      nga.field('rule', 'wysiwyg'),
      nga.field('faq', 'wysiwyg'),
      nga.field('staffs', 'referenced_list')
          .targetEntity(admin.getEntity('users'))
          .targetField(nga.field('name'))
          .label('Staffs'),

      // Registration
      nga.field('registrable', 'boolean'),
      nga.field('startDate', 'date'),
      nga.field('endDate', 'date'),
      nga.field('inforRequire', 'string')
        .label('Required Information'),

      // Invitation

      // Schedule
      nga.field('stages', 'embedded_list')
        .targetFields([
          nga.field('name')
        ])
    ]);

  tournaments.editionView().fields(tournaments.creationView().fields());
}

