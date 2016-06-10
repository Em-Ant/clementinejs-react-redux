import React from 'react';
import { MainContainer as Main } from './components/main.jsx';
import Login from './components/login.jsx';
import { ProfileContainer as Profile } from './components/profile.jsx';


const App = ({ children }) => (
  <div>
    {children}
  </div>
);

App.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

export const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Login },
  childRoutes: [
    { path: 'main', component: Main },
    { path: 'profile', component: Profile },
    { path: 'login', component: Login },
  ],
};
