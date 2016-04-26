'use strict'

process.env.NODE_ENV = 'test'

var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../../app')
var should = chai.should()

chai.use(chaiHttp)

// describe('Articles', function() {

//   before(function() {
//     factory.cleanup()
//   })

//   beforeEach(function() {
//     var user = factory.buildSync('user')
//     var article = factory.buildSync('article')
//     article.author = user._id
//     user.save()
//     article.save()
//   })

//   afterEach(function(done) {
//     done()
//   })

//   after(function(done) {
//     factory.cleanup()
//     done()
//   })

//   describe('GET /articles', function() {

//     it('should return index page', function(done) {
//       chai.request(server)
//         .get('/articles')
//         .end(function(err, res) {
//           res.should.have.status(200)
//           done()
//         })
//     })

//   })

// })


/*
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
*/
