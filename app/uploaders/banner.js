var config = require('../../config/config');
var cloudinary = require('cloudinary');

cloudinary.config(config.cloudinary);

exports.upload = function(tournament, file, callback) {
  if (!file)
    return callback(tournament);

  options = { public_id: 'tournaments/' + tournament._id };

  cloudinary.uploader.upload(file.path, function(replay) {
    tournament.replay = replay.url;
    callback(tournament);
  }, options);
}
