'use strict';

var nodemailer = require('nodemailer');
var Errors = require('./errors');

// email templates
var path = require('path');
var emailTemplates = require('email-templates');
var templatesDir = path.resolve(__dirname, '../', 'emailTemplates');

// configuration
var env = process.env.NODE_ENV || 'development';
var config = require('../../../config/config')[env];
// var logger = require('./loggerService.js').logger;

var transport = nodemailer.createTransport('SMTP', {
  service: 'Gmail',
  auth: {
    user: 'testeandrefelipecp',
    pass: 'Teste2013'
  }
});

/**
 * Send a single email
 * @param  {object}   options  options.template = required email template
 *                             Need a folder in views/emailTemplates.
 *                             options.from = from email address
 *                             "First Last <email>".
 *                             options.subject = subject line.
 * @param  {object}   data     Data to be populated in the email
 *                             e.g data.email, data.name.
 * @param  {Function} callback needs variables err and template.
 *                             Either error out or pass through to the
 *                             template generation.
 */
exports.sendMail = function(options, data, callback) {
  emailTemplates(templatesDir, function(err, template) {
    if (err) {
      console.log("1 erro ao enviar email.", err);
      callback(new Errors.MailerError(err));
    } else {
      // Send a single email
      template(options.template, data, function(err, html, text) {
        if (err) {
          console.log("2 erro ao enviar email.", err);
          callback(new Errors.MailerError(err));
        } else {
          transport.sendMail({
            from: options.from,
            to: data.email,
            subject: options.subject,
            html: html,
            // generateTextFromHTML: true,
            text: text
          }, function(err, responseStatus) {
            if (err) {
              console.log("3 erro ao enviar email.", err);
              callback(new Errors.MailerError(err));
            } else {
              console.log("sucesso ao enviar email.");
              callback(null, responseStatus);
            }
          });
        }
      });
    }
  });
};
