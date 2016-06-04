'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    _users2.default.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(new _passportTwitter.Strategy({
    consumerKey: _auth2.default.twitterAuth.consumerKey,
    consumerSecret: _auth2.default.twitterAuth.consumerSecret,
    callbackURL: _auth2.default.twitterAuth.callbackURL
  }, function (token, refreshToken, profile, done) {
    process.nextTick(function () {
      _users2.default.findOne({ 'twitter.id': profile.id }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        }
        var newUser = new _users2.default();

        newUser.twitter.id = profile.id;
        newUser.twitter.username = profile.username;
        newUser.twitter.displayName = profile.displayName;
        newUser.nbrClicks.clicks = 0;

        newUser.save(function (error) {
          if (error) {
            throw error;
          }
          return done(null, newUser);
        });
        return true;
      });
    });
  }));
};

var _passportTwitter = require('passport-twitter');

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }