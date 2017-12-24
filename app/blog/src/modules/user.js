import 'whatwg-fetch';
import Cookies from 'universal-cookie';
import { Config } from '../utils/config';

export const LOGIN = 'user/LOGIN';
export const LOGOUT = 'user/LOGOUT';
export const LOGIN_ERROR = 'user/LOGIN_ERROR';
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';

const initialState = {
  logged: false,
  token: null,
  loginMessage: ''
}

const cookies = new Cookies();

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loginMessage: '',
        logged: true
      }

    case LOGOUT:
      return {
        ...state,
        logged: false,
        token: null
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        logged: true
      }

    case LOGIN_ERROR:
      return {
        ...state,
        loginMessage: action.message,
        logged: false
      }
    default:
      return state
  }
}


export const login = (username, password) => {
  return dispatch => {

    let user = cookies.get('user');

    if (user !== undefined) {
      dispatch({
        type: LOGIN_SUCCESS,
        token: user
      })
    } else {
      fetch(Config.apiUrl + 'Users/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then(function(response) {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          dispatch({
            type: LOGIN_ERROR,
            message: 'Pseudo ou mot de passe incorrecte'
          })
        } else if (response.status === 500) {
          dispatch({
            type: LOGIN_ERROR,
            message: 'Erreur application'
          })
        }
      }).then(function(user) {
        if (user) {
          cookies.set('user', user.id, {path: '/', maxAge: user.ttl});
          dispatch({
            type: LOGIN_SUCCESS,
            token: user.id
          })
        }
      });
    }
  }
}

export const logout = () => {
  return dispatch => {
    // TODO delete token from database
    cookies.remove('user');
    dispatch({
      type: LOGOUT
    })
  }
}

