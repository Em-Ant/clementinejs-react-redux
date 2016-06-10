
function setClicks(state, clicks) {
  return {
    ...state,
    clicks,
    loading: undefined,
  };
}

function setLoading(state, what) {
  return {
    ...state,
    loading: what,
  };
}

function logIn(state, user) {
  return {
    ... state,
    user,
  };
}

function logOut(state) {
  return {
    ...state,
    loggedIn: false,
    user: undefined,
  };
}

const initState = { clicks: 0, loggedIn: false };

export default (state = initState, action) => {
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

export const getUser = state => state.user || { username: 'guest' };
export const getClicks = state => state.clicks || '0';
