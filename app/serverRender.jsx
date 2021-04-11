import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import React from 'react';

import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import Routes from '../client/src/Routes';
import reducer from '../client/src/reducer';
import Users from './models/users';

const renderHelper = (res, location, store) => {
  const context = {};

  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={location}>
        <Routes />
      </StaticRouter>
    </Provider>,
  );

  if (context.url) {
    // Somewhere a `<Redirect>` was rendered
    res.redirect(301, context.url);
  } else {
    // we're good, send the response
    const finalState = store.getState();
    res.send(`
        <!doctype html>
        <html>
          <head>
            <title>Clementine-React-Redux</title>
            <link rel="stylesheet" href="/static/style.css" media="all">
          </head>
          <body>
            <div id="root">${html}</div>
            <script>
              window.__INITIAL_STATE__ = ${JSON.stringify(finalState)}
            </script>
            <script src="/static/bundle.js"></script>
          </body>
        </html>
        `);
  }
};

export default ({ isAuthenticated, url, user }, res) => {
  if (isAuthenticated()) {
    const twitterId = user.twitter;
    // redirect to main if logged in
    Users.findOne({ 'twitter.id': twitterId.id }, (err, response) => {
      if (err) return res.status(500).send(err.message);
      const initialState = { counter: response.nbrClicks.clicks, loggedIn: true, user };
      const store = createStore(reducer, initialState);
      return renderHelper(res, url, store);
    });
  }
  const initialState = {};
  const store = createStore(reducer, initialState);
  return renderHelper(res, url, store);
};
