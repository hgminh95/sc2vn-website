'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' }
},
{
   timestamps: {
     createdAt: 'created_at',
     updatedAt: 'updated_at'
   }
});

ArticleSchema.methods = {
  to_link: function() {
    return '/articles/' + this._id;
  }
}

ArticleSchema.statics = {
  all: function(callback) {
    return this.find({}).exec(callback);
  }
};

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;

