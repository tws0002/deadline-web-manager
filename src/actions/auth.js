import fetch from 'cross-fetch';
import serverURL from '../config/serverURL';
import Cookies from 'js-cookie'


export const REQUEST_AUTH = 'REQUEST_AUTH';
const requestAuth = () => {
  return {
    type: REQUEST_AUTH
  }
};


export const AUTH_ERROR = 'AUTH_ERROR';
const authError = () => {
  return {
    type: AUTH_ERROR,
  }
};


export const AUTH_SUCCESS = 'AUTH_SUCCESS';
const authSuccess = info => {
  return {
    type: AUTH_SUCCESS,
    info
  }
};


export const AUTH_CANCEL = 'AUTH_CANCEL';
const authCancel = () => {
  return {
    type: AUTH_CANCEL
  }
};


// action creators
export const login = (username, password) => {
  return dispatch => {
    dispatch(requestAuth());

    const encodeString = btoa(username + ':' + password);
    const authData = 'Basic ' + encodeString;
    return fetch(serverURL + 'api/pools', {
        headers: {'authorization': authData}
      }).then(res => {
        if (res.status === 200){
          return true;
        }else{
          return false;
        }
      }).then(success => {
        if (success) {
          const data = {
            name: username,
            data: authData
          };
          Cookies.set('auth', data);
          dispatch(authSuccess(data));
        }else{
          dispatch(authError());
        }
      });
  }
}

export const checkAuthCookie = () => {
  return dispatch => {
    const data = Cookies.getJSON('auth');
    if (data) {
      dispatch(authSuccess(data));
    }
  };
}

export const signOut = () => {
  return dispatch => {
    Cookies.remove('auth');
    dispatch(authCancel());
  };
}