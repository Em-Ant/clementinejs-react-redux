import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import React from 'react';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import { routes } from '../client/src/routes.jsx';
import reducer from '../client/src/reducer';
import Users from './models/users.js';

const renderHelper = (component, initialState = {}) => {
  const store = createStore(reducer, initialState);
  const html = renderToString(
    <Provider store={store}>
      {component}
    </Provider>
  );
  const finalState = store.getState();
  return `
  <!doctype html>
  <html>
    <head>
      <title>Clementine-React-Redux</title>
      <link rel="stylesheet" href="/static/style.css" media="all">
    </head>
    <body>
      <div id="appView">${html}</div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(finalState)}
      </script>
      <script src="/static/bundle.js"></script>
      <script src="/static/vendors.js"></script>
    </body>
  </html>
  `;
};

export default (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      let initialState = {};
      if (req.isAuthenticated()) {
        const user = req.user.twitter;
        console.log('Authenticated', user);
        Users.findOne({ 'twitter.id': user.id }, (err, response) => {
          if (err) res.status(500).send(err.message);
          initialState = { counter: response.nbrClicks.clicks, loggedIn: true, user };
          res.send(renderHelper(<RouterContext {...renderProps } />, initialState));
        });
      } else {
        res.send(renderHelper(<RouterContext {...renderProps } />));
      }
    } else {
      res.status(404).send('Not found');
    }
  });
};
