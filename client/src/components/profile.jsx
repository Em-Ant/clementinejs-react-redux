
import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

import { getUser } from '../reducer';
import { Link } from 'react-router';

const Profile = ({ user }) => (
  <div className="container">
    <div className="twitter-profile">
      <img src="img/twitter_32px.png" alt="twitter logo" />
      <p>
        <span>ID: </span>
        <span id="profile-id" className="profile-value">
          {user.id}
        </span>
      </p>
      <p>
        <span>Username: </span>
        <span id="profile-username" className="profile-value">
          {user.username}
        </span>
      </p>
      <p>
        <span>Display Name: </span>
        <span id="display-name" className="profile-value">
          {user.displayName}
        </span>
      </p>
      <Link className="menu" to="/main" >Home</Link>
      <p id="menu-divide">|</p>
      <a className="menu" href="/logout">Logout</a>
    </div>
  </div>
);

Profile.propTypes = {
  user: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    user: getUser(state),
  };
}

export const ProfileComponent = Profile;
export const ProfileContainer = connect(mapStateToProps, actionCreators)(Profile);
