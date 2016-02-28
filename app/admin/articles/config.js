'use strict';

module.exports = function(nga, admin) {
  var articles = admin.getEntity('articles');
  
  articles.listView().fields([
    nga.field('title').isDetailLink(true),
    nga.field('content'),
    nga.field('created_at'),
    nga.field('updated_at')
  ]);
  
  articles.creationView().fields([
    nga.field('title'),
    nga.field('content')
  ]);
  
  articles.editionView().fields(articles.creationView().fields());
}

