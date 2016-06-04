

const appUrl = window.location.origin;
const { $ } = window;
import { browserHistory as history } from 'react-router';

function setClicks(nClicks) {
  return { type: 'SET_CLICKS', clicks: nClicks };
}

function logOut() {
  return { type: 'LOGOUT' };
}

function logIn(user, nClicks) {
  return { type: 'LOGIN', user, clicks: nClicks };
}

export const reset = () => (dispatch) => {
  dispatch({ type: 'LOADING', what: 'clicks' });
  $.ajax({
    type: 'DELETE',
    url: `${appUrl}/api/user/clicks`,
    success() {
      $.get(`${appUrl}/api/user/clicks`, data => {
        const nClicks = data.clicks;
        dispatch(setClicks(nClicks));
      });
    },
  });
};

export const click = () => (dispatch) => {
  dispatch({ type: 'LOADING', what: 'clicks' });
  $.post(`${appUrl}/api/user/clicks`, () => {
    $.get(`${appUrl}/api/user/clicks`, (data) => {
      const nClicks = data.clicks;
      dispatch(setClicks(nClicks));
    });
  });
};

export const requestUser = () => (dispatch) => {
  $.get(`${appUrl}/api/user`, (data) => {
    const user = data;
    if (user.unauth) {
      dispatch(logOut());
      history.replace('/login');
    } else {
      history.replace('/main');
      $.get(`${appUrl}/api/user/clicks`, (response) => {
        const nClicks = response.clicks;
        dispatch(logIn(user));
        dispatch(setClicks(nClicks));
      });
    }
  });
};
