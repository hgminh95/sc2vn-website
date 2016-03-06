'use strict';

module.exports = function(nga, admin) {
  var articles = admin.getEntity('articles');

  articles.listView().fields([
    nga.field('title').isDetailLink(true).detailLinkRoute('show'),
    nga.field('content', 'text'),
    nga.field('created_at', 'datetime'),
    nga.field('updated_at', 'datetime')
  ]);

  articles.showView().fields([
    nga.field('title'),
    nga.field('content', 'text'),
    nga.field('created_at', 'datetime'),
    nga.field('updated_at', 'datetime')
  ]);

  articles.creationView().fields([
    nga.field('title'),
    nga.field('content', 'text'),
    nga.field('author')
  ]);

  articles.editionView().fields(articles.creationView().fields());
}

