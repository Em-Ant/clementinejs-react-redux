var React = require('react');
var ReactDOM = require('react-dom');
var css = require('../style/main.scss');

var Main = require('./components/main.jsx').MainContainer;
var Login = require('./components/login.jsx').Login;
var Profile = require('./components/profile.jsx').ProfileContainer;

var reducer = require('./reducer.js');
var Provider = require('react-redux').Provider;
var createStore = require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;


var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;


var thunk = require('redux-thunk');

var actions = require('./actions.js');

const store = createStore(reducer,applyMiddleware(thunk));

var App = React.createClass({
  componentDidMount: function() {
    store.dispatch(actions.requestUser());
  },
  render: function () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
});


ReactDOM.render(
  <Provider store={store}>
    <Router >
      <Route path="/" component={App}>
        <IndexRoute component={Login} />
        <Route path="/main" component={Main} />
        <Route path="/profile"component={Profile} />
        <Route path="/login" component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('appView'));
