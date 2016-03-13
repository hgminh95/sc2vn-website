var config = require('../../config/config');
var cloudinary = require('cloudinary');

cloudinary.config(config.cloudinary);

exports.upload = function(article, file, callback) {
  if (!file)
    return callback(article);

  options = { public_id: 'articles/' + article._id };

  cloudinary.uploader.upload(file.path, function(thumbnail) {
    article.thumbnail = thumbnail.url;
    callback(article);
  }, options);
}
