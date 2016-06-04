
import { getUser, getClicks } from '../reducer';
import { Link } from 'react-router';

import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

const Main = ({ click, reset, clicks, user }) => (
  <div>
    <header>
      <p>Welcome, <span id="display-name">{user.username}</span>!</p>
      <Link className="menu" to="/profile">Profile</Link>
      <p>|</p>
      <a className="menu" href="/logout">Logout</a>
    </header>

    <div className="container">
      <img alt="logo" src="img/clementine_150.png" />
      <br />
      <p className="clementine-text">Clementine.js</p>
    </div>

    <div className="container">
      <p>You have clicked the button <span id="click-nbr">{clicks}</span> times.</p>
      <br />
      <div className="btn-container">
        <button onClick={click} className="btn">CLICK ME!</button>
        <button onClick={reset} className="btn">RESET</button>
      </div>
    </div>
  </div>
);

Main.propTypes = {
  click: React.PropTypes.func.isRequired,
  reset: React.PropTypes.func.isRequired,
  clicks: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number]).isRequired,
  user: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: getUser(state),
    clicks: getClicks(state),
  };
}

export const MainComponent = Main;
export const MainContainer = connect(mapStateToProps, actionCreators)(Main);
