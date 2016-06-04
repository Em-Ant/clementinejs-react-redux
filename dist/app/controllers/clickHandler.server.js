'use strict';

var _users = require('../models/users.js');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ClickHandler() {
  this.getClicks = function (req, res) {
    _users2.default.findOne({ 'twitter.id': req.user.twitter.id }, { _id: false }).exec(function (err, result) {
      if (err) {
        throw err;
      }
      res.json(result.nbrClicks);
    });
  };

  this.addClick = function (req, res) {
    _users2.default.findOneAndUpdate({ 'twitter.id': req.user.twitter.id }, { $inc: { 'nbrClicks.clicks': 1 } }).exec(function (err, result) {
      if (err) {
        throw err;
      }
      res.json(result.nbrClicks);
    });
  };

  this.resetClicks = function (req, res) {
    _users2.default.findOneAndUpdate({ 'twitter.id': req.user.twitter.id }, { 'nbrClicks.clicks': 0 }).exec(function (err, result) {
      if (err) {
        throw err;
      }
      res.json(result.nbrClicks);
    });
  };
}

module.exports = ClickHandler;