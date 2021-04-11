import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import PropTypes from 'prop-types';

import { MainContainer as Main } from './components/main';
import Login from './components/Login';
import { ProfileContainer as Profile } from './components/profile';

const ProtectedRoute = ({ children, ...props }) => {
  const isLoggedIn = useSelector((state) => state.loggedIn);

  const content = !isLoggedIn ? <Redirect to="/login" /> : children;
  return <Route {...props}>{content}</Route>;
};

ProtectedRoute.defaultProps = {
  children: undefined,
};

ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const LoginRoute = ({ children, ...props }) => {
  const isLoggedIn = useSelector((state) => state.loggedIn);

  const content = isLoggedIn ? <Redirect to="/" /> : children;

  return <Route {...props}>{content}</Route>;
};

LoginRoute.defaultProps = {
  children: undefined,
};

LoginRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const Routes = () => (
  <Switch>
    <ProtectedRoute exact path="/">
      <Redirect to="/main" />
    </ProtectedRoute>
    <ProtectedRoute path="/main">
      <Main />
    </ProtectedRoute>
    <ProtectedRoute path="/profile">
      <Profile />
    </ProtectedRoute>
    <LoginRoute path="/login">
      <Login />
    </LoginRoute>
  </Switch>
);

export default Routes;
