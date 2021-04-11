import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import Routes from './Routes';

import '../style/main.scss';

import reducer from './reducer';

/* eslint-disable no-underscore-dangle */
const ReactReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__
&& window.__REDUX_DEVTOOLS_EXTENSION__();

const enhancer = ReactReduxDevTools ? compose(
  applyMiddleware(thunk),
  ReactReduxDevTools,
) : applyMiddleware(thunk);

const initialState = window.__INITIAL_STATE__;
const store = createStore(reducer, initialState, enhancer);

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>
);

export default App;
