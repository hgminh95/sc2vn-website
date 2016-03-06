process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var User = require('../../app/models/users');
var Article = require('../../app/models/articles');

chai.use(chaiHttp);

describe('Articles', function() {
  var article;
  beforeEach(function(done) {
    Article.collection.drop();
    User.collection.drop();

    user = new User({ name: 'Canh' });
    article = new Article({
      title: 'Test Article',
      content: 'No content',
      author: user.id
    });
    user.save();
    article.save(function(err) {
      if (err) throw err;
      done();
    });
  });

  afterEach(function(done) {
    done();
  });

  describe('GET /articles', function() {
    it('should return index page', function(done) {
      chai.request(server)
        .get('/articles')
        .end(function(err, res){
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('GET /articles/:articleId', function(){
    it('should return show page', function(done) {
      chai.request(server)
        .get('/articles/' + article._id)
        .end(function(err, res){
          res.should.have.status(200);
          done();
        });
    })
  });
})
