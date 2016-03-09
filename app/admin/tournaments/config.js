'use strict';

module.exports = function(nga, admin) {
  var tournaments = admin.getEntity('tournaments');

  tournaments.listView().fields([
    nga.field('name').isDetailLink(true).detailLinkRoute('show'),
    nga.field('owner', 'reference')
        .targetEntity(admin.getEntity('users'))
        .targetField(nga.field('name'))
        .label('Owner'),
    nga.field('created_at', 'datetime'),
    nga.field('updated_at', 'datetime')
  ]);

  tournaments.showView().fields([
    nga.field('name'),
    nga.field('owner', 'reference')
        .targetEntity(admin.getEntity('users'))
        .targetField(nga.field('name'))
        .label('Owner'),
    nga.field('staffs', 'referenced_list')
        .targetEntity(admin.getEntity('users'))
        .targetField(nga.field('name'))
        .label('Staffs'),
    nga.field('sections', 'embedded_list')
        .targetFields([
          nga.field('title'),
          nga.field('content', 'text')
        ]),
    nga.field('created_at', 'datetime'),
    nga.field('updated_at', 'datetime')
  ]);

  tournaments.creationView().fields([
    nga.field('name'),
    nga.field('owner', 'reference')
        .targetEntity(admin.getEntity('users'))
        .targetField(nga.field('name'))
        .label('Owner'),
    nga.field('staffs', 'referenced_list')
        .targetEntity(admin.getEntity('users'))
        .targetField(nga.field('name'))
        .label('Staffs'),
    nga.field('sections', 'embedded_list')
        .targetFields([
          nga.field('title'),
          nga.field('content', 'text')
        ])
  ]);

  tournaments.editionView().fields(tournaments.creationView().fields());
}

