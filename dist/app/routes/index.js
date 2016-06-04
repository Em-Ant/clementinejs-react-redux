'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app, passport) {
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.json({ status: 'forbidden' });
  }

  var clickHandler = new _clickHandler2.default();

  app.route('/api/user').get(function (req, res) {
    if (req.user && req.user.twitter) {
      return res.json(req.user.twitter);
    }
    return res.json({ unauth: true });
  });

  app.route('/auth/twitter').get(passport.authenticate('twitter'));

  app.route('/auth/twitter/callback').get(passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  app.route('/logout').get(function (req, res) {
    req.logout();
    res.redirect('/login');
  });

  app.route('/api/user/clicks').get(isLoggedIn, clickHandler.getClicks).post(isLoggedIn, clickHandler.addClick).delete(isLoggedIn, clickHandler.resetClicks);

  app.route('/*').get(function (req, res) {
    res.sendFile(path + '/public/index.html');
  });
};

var _clickHandler = require('../controllers/clickHandler.server');

var _clickHandler2 = _interopRequireDefault(_clickHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = process.cwd();