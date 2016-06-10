import React from 'react';
import ReactDOM from 'react-dom';

import reducer from './reducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { Router, browserHistory } from 'react-router';

import thunk from 'redux-thunk';
import { routes } from './routes.jsx';

// eslint-disable-next-line no-unused-vars
import css from '../style/main.scss';

// Grab the state from a global injected into server-generated HTML
// eslint-disable-next-line no-underscore-dangle
const initialState = window.__INITIAL_STATE__;

const store = createStore(reducer, initialState, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('appView'));
