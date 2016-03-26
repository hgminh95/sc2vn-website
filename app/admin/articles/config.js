'use strict';

module.exports = function(nga, admin) {
  var articles = admin.getEntity('articles');

  articles.listView().fields([
    nga.field('title').isDetailLink(true).detailLinkRoute('show'),
    nga.field('author_id', 'reference')
        .targetEntity(admin.getEntity('users'))
        .targetField(nga.field('name'))
        .label('Author'),
    nga.field('created_at', 'datetime'),
    nga.field('updated_at', 'datetime')
  ]);

  articles.showView().fields([
    nga.field('title'),
    nga.field('author', 'reference')
        .targetEntity(admin.getEntity('users'))
        .targetField(nga.field('name'))
        .label('Author'),
    nga.field('thumbnail'),
    nga.field('brief', 'text'),
    nga.field('content', 'wysiwyg'),
    nga.field('created_at', 'datetime'),
    nga.field('updated_at', 'datetime')
  ]);

  articles.creationView().fields([
    nga.field('title'),
    nga.field('author', 'reference')
        .targetEntity(admin.getEntity('users'))
        .targetField(nga.field('name'))
        .label('Author'),
    nga.field('thumbnail'),
    nga.field('brief', 'text'),
    nga.field('content', 'wysiwyg')
  ]);

  articles.editionView().fields(articles.creationView().fields());
}

