import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { MainContainer as Main } from './components/main.jsx';
import Login from './components/login.jsx';
import { ProfileContainer as Profile } from './components/profile.jsx';

import reducer from './reducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import thunk from 'redux-thunk';

import * as actions from './actions.js';

// eslint-disable-next-line no-unused-vars
import css from '../style/main.scss';

const store = createStore(reducer, applyMiddleware(thunk));

class App extends Component {
  componentDidMount() {
    store.dispatch(actions.requestUser());
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Login} />
        <Route path="/main" component={Main} />
        <Route path="/profile"component={Profile} />
        <Route path="/login" component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('appView'));
