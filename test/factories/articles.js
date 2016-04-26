'use strict'

var Article = require('../../app/models/articles')
var factory = require('factory-girl')

factory.define('article_normal', Article, {
	title: factory.sequence(function(n) {
		return 'Article #' + n
	}),
	content: 'There is no content here'
})