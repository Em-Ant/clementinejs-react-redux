
const appUrl = window.location.origin;
import ajax from './utils/ajax';
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
  ajax(
    'DELETE',
   `${appUrl}/api/user/clicks`
 ).then(() => {
   ajax('GET', `${appUrl}/api/user/clicks`)
   .then(data => {
     const nClicks = data.clicks;
     dispatch(setClicks(nClicks));
     /* eslint-disable no-console */
   }, error => { console.log(error); });
 }, error => { console.log(error); });
 /* eslint-enable no-console */
};

export const click = () => (dispatch) => {
  dispatch({ type: 'LOADING', what: 'clicks' });
  ajax('POST', `${appUrl}/api/user/clicks`).then(() => {
    ajax('GET', `${appUrl}/api/user/clicks`).then(data => {
      const nClicks = data.clicks;
      dispatch(setClicks(nClicks));
    /* eslint-disable no-console */
    }, error => { console.log(error); });
  }, error => { console.log(error); });
  /* eslint-enable no-console */
};

export const requestUser = () => (dispatch) => {
  ajax('GET', `${appUrl}/api/user`).then(data => {
    console.log('user', data);
    const user = data;
    if (user.unauth) {
      dispatch(logOut());
      history.replace('/login');
    } else {
      history.replace('/main');
      ajax('GET', `${appUrl}/api/user/clicks`).then(response => {
        const nClicks = response.clicks;
        dispatch(logIn(user));
        dispatch(setClicks(nClicks));
      /* eslint-disable no-console */
      }, error => { console.log(error); });
    }
  }, error => { console.log(error); });
  /* eslint-enable no-console */
};
