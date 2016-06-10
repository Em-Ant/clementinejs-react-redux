import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import React from 'react';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import { createRoutes } from '../client/src/routes.jsx';
import reducer from '../client/src/reducer';
import Users from './models/users';

const renderHelper = (res, location, routes, store) => {
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps } />
        </Provider>
      );
      const finalState = store.getState();
      res.send(`
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
          <script src="/static/vendors.js"></script>
          <script src="/static/bundle.js"></script>
        </body>
      </html>
      `);
    } else {
      res.status(404).send('Not found');
    }
  });
};

export default (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user.twitter;
    // redirect to main if logged in
    if (req.url === '/login') return res.redirect(302, '/main');
    Users.findOne({ 'twitter.id': user.id }, (err, response) => {
      if (err) return res.status(500).send(err.message);
      const initialState = { counter: response.nbrClicks.clicks, loggedIn: true, user };
      const store = createStore(reducer, initialState);
      const routes = createRoutes(store);
      return renderHelper(res, req.url, routes, store);
    });
  } else {
    // redirect to login if not logged in
    if (req.url !== '/login') return res.redirect(302, '/login');
    const initialState = {};
    const store = createStore(reducer, initialState);
    const routes = createRoutes(store);
    return renderHelper(res, req.url, routes, store);
  }
  return null;
};
