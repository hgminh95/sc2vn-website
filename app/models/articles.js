'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: { type: String, required: true },
  brief: { type:String },
  content: { type: String, required: true },
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
  list: function(options, callback) {
    options.perPage = options.perPage || 10
    options.page = options.page || 0

    this.find({})
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .sort({
        created_at: 'desc'
      })
      .exec(callback)
  },

  all: function(callback) {
    return this.find({}).populate('author').exec(callback);
  },

  fields: function() {
    return 'title content brief thumbnail author'
  },

  getNewPath: function() {
    return '/articles/new'
  }
};

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
