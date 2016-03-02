'use strict';

module.exports = function(nga, admin) {
  var tournaments = admin.getEntity('tournaments');
    
  tournaments.listView().fields([
    nga.field('name').isDetailLink(true).detailLinkRoute('show'),
    nga.field('sections'),
    nga.field('created_at', 'datetime'),
    nga.field('updated_at', 'datetime')
  ]);
  
  tournaments.showView().fields([
    nga.field('name'),
    nga.field('sections', 'embedded_list')
        .targetFields([
          nga.field('title'),
          nga.field('content')
        ]),
    nga.field('created_at', 'datetime'),
    nga.field('updated_at', 'datetime')
  ]);
  
  tournaments.creationView().fields([
    nga.field('name'),
    nga.field('sections', 'embedded_list')
        .targetFields([
          nga.field('title'),
          nga.field('content')
        ])
  ]);
  
  tournaments.editionView().fields(tournaments.creationView().fields());
}

