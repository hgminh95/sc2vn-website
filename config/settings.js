'use strict'

var fs = require('fs')
var settingsFile = require('path').join(__dirname, 'settings.json')

let settings = {}
let data = {}

if (fs.existsSync(settingsFile)) {
  data = fs.readFileSync(settingsFile, 'utf-8')
  data = JSON.parse(data)
}

settings.articles_per_page    = data.articles_per_page    || 5
settings.matches_per_page     = data.matches_per_page     || 20
settings.recent_matches_count = data.recent_matches_count || 5
settings.top_players_count    = data.top_players_count    || 5
settings.players_per_page     = data.players_per_page     || 50

settings.save = function(callback) {
  var jsonSettings = JSON.stringify(this, null, 2)

  fs.writeFile(settingsFile, jsonSettings, function(err) {
    if (err) return callback(err)
    return callback(null)
  })
}

module.exports = settings
