
function setClicks(state, clicks) {
  return {
    ...state,
    clicks,
    loading : undefined,
  }
}

function setLoading(state, what) {
  return {
    ...state,
    loading: what,
  }
}

function logIn(state, user, nClicks) {
  return {
    ... state,
    user
  }
}

function logOut(state) {
  return state.set('loggedIn', false).delete('user');
}

var initState = {clicks: 0, loggedIn: false, page: 'main'};

module.exports = function(state = initState, action) {
  switch (action.type) {
    case 'SET_CLICKS':
      return setClicks(state, action.clicks);
    case 'LOGIN':
      return logIn(state, action.user);
    case 'LOGOUT':
      return logOut(state);
    case 'LOADING':
      return setLoading(state, action.what);
    default:
      return state;
  }
};
