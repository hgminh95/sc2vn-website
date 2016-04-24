var config = require('../../config/config');
var cloudinary = require('cloudinary');

cloudinary.config(config.cloudinary);

exports.upload = function(map, file, callback) {
  if (!file) return callback(map);

  options = { public_id: 'maps/' + map._id };

  cloudinary.uploader.upload(file.path, function(thumbnail) {
    map.thumbnail = thumbnail.url;
    callback(map);
  }, options);
}
