'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var actionCreators = require('../actions.js');

var Login = React.createClass({
  render: function () {
    return (
      <div className="container">
        <div className="login">
          <img src="img/clementine_150.png" />
          <br />
          <p className="clementine-text">Deployment test</p>
          <button bsStyle="primary" href="auth/twitter">
            Added Customizable Bootstrap (I'm a btn-primary!)
          </button>
          <p>and jQuery...</p>
        </div>
      </div>
    )
  }
});


module.exports.Login = Login;
