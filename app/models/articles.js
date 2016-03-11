'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String },
  thumbnail: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' }
},
{
   timestamps: {
     createdAt: 'created_at',
     updatedAt: 'updated_at'
   }
});

ArticleSchema.methods = {
  getShowPath: function() {
    return '/articles/' + this._id;
  },

  getEditPath: function() {
    return '/articles/' + this._id + '/edit';
  },

  getMetaInfo: function() {
    return this.created_at.toDateString() + ' / 0 Comments / in Random';
  }
}

ArticleSchema.statics = {
  all: function(callback) {
    return this.find({}).populate('author').exec(callback);
  },

  fields: function() {
    return 'title content author'
  },

  getNewPath: function() {
    return '/articles/new'
  }
};

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
