'use strict';
import { User } from '../sqldb';


var mailer = require('nodemailer');

var transportOpts = {
  service: 'Gmail',
  secureConnection: true, // use SSL
  port: 465, // port
  auth: {
    user: 'bilynsg@gmail.com',
    pass: 'g0404651'
  }
};


var generatePassword = function () {
  var buf = new Buffer(8);
  for (var i = 0; i < buf.length; i++) {
    buf[i] = Math.floor(Math.random() * 256);
  }
  var id = buf.toString('base64').substring(0, 8);
  return id;
};

var sendEmail = function (password, email, cb) {

  var transport = mailer.createTransport(transportOpts);
  transport.sendMail({
    sender: 'bilynsg@gmail.com',
    to: email,
    subject: 'Password reset request',
    text: "",
    html: [
      'Please use the below temporary password:\r\n',
      '<br>',
      '<p>',
      password,
      '</p>',
      ''
    ].join('\r\n')
  }, function (error, success) {
    if (error) {
      if (cb.error)
        cb.error(error);
    } else {
      if (cb.success)
        cb.success(success)
    }
  });

};

// var saveTempPassword = function (email, password) {
//   console.log('save password for user email: ' + email);
//   User.find({
//     where: {
//       //email: email,
//       loginId: email
//     }
//   })
//     .then(function (user) {
//       user.update({
//         tempPassword: password
//       })
//       console.log("Get current user: " + user.loginId);
//     })
//     .catch(function (res) {
//       console.log("Get current user error: " + res);
//     });
// };

export function requestresetpassword(req, res) {
  var email = req.body.email;
  var password = generatePassword();

  var callback = {
    error: function (err) {
      res.end('Error sending message: ' + err);
    },
    success: function (success) {
      //  saveTempPassword(email, password);
      User.find({
        where: {
          //email: email,
          loginId: email
        }
      })
      .then(function (user) {
        return user.update({
          tempPassword: password
        });
      })
      .then(function () {
        res.end('Check your inbox for a password reset message.');
      })
      .catch(function (res) {
         res.end('Error in set password, please try later.');
    });

    }
  };
  sendEmail(password, email, callback);
}


