'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = new _mongoose.Schema({
  twitter: {
    id: String,
    displayName: String,
    username: String
  },
  nbrClicks: {
    clicks: Number
  }
});

exports.default = _mongoose2.default.model('User', User);