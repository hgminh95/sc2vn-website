var nodemailer = require('nodemailer')
var EmailTemplate = require('email-templates').EmailTemplate
var config = require('../../config/config')
var path = require('path')

var sendOne = function (user, templateName, callback) {
  if ((!user || !user.email) && callback) callback(new Error('Email must be present'))

  var templateDir = path.join(__dirname, '..', 'views', 'mailers')
  var template = new EmailTemplate(path.join(templateDir, templateName))
  var transporter = nodemailer.createTransport(config.smtpConfig)

  template.render({user: user}, function (err, result) {
    if (err && callback) return callback(err)
    var mailOptions = {
      from: `sc2vn <$(process.env.MAIL_USER)>`,
      to: user.email,
      subject: result.subject,
      text: result.text,
      html: result.html
    }
    transporter.sendMail(mailOptions, function (err, info) {
      if (err && callback) return callback(err)
      if (callback) callback(null, info)
    })
  })
}

exports.sendConfirmEmail = function (user, callback) {
  user.confirm_link = config.host + user.getConfirmPath()
  sendOne(user, 'email_confirm', callback)
}

exports.sendResetPasswordEmail = function (user, callback) {

}
