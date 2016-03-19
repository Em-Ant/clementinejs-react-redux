'use strict'

var Link = require('react-router').Link

var React = require('react');
var connect = require('react-redux').connect;
var actionCreators = require('../actions.js');


var Main = React.createClass({

  render: function () {
    return (
      <div>
        <header>
          <p>Welcome, <span id="display-name">{this.props.user.username}</span>!</p>
          <Link className="menu" to="/profile">Profile</Link>
          <p>|</p>
          <a className="menu" href="/logout">Logout</a>
        </header>

        <div className="container">
          <img src="img/clementine_150.png" />
          <br />
          <p className="clementine-text">Clementine.js</p>
        </div>

        <div className="container">
          <p>You have clicked the button <span id="click-nbr">{this.props.clicks}</span> times.</p>
          <br />
          <div className="btn-container">
            <button onClick={this.props.click} className="btn btn-add">CLICK ME!</button>
            <button onClick={this.props.reset} className="btn btn-delete">RESET</button>
          </div>
        </div>
      </div>
    )
  }
});

function mapProps(state) {
  return {
    user: state.get('user') || {username: 'Guest'},
    clicks: state.get('clicks')
  }
}

module.exports.Main = Main;
module.exports.MainContainer = connect(mapProps, actionCreators)(Main);