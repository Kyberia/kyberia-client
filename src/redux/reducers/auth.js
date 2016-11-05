// constants
import createReducer from '../createReducer';

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
const LOGIN_RESOLVED = 'LOGIN_RESOLVED';
const LOGIN_FAILED = 'LOGIN_FAILED'; // on auth error
const LOGIN_ERROR = 'LOGIN_ERROR'; // on server error
const LOGOUT_REQUESTED = 'LOGOUT_REQUESTED';

const initialAuthState = {
  isLoggedIn: false,
  loginPending: true,
  user: undefined,
};


// updater functions
const clearLogin = state => Object.assign({}, state, {
  isLoggedIn: false,
  loginPending: false,
  user: undefined,
});

// reducer
const auth = createReducer({
  [LOGIN_REQUESTED](state) {
    return Object.assign({}, state, { loginPending: true });
  },
  [LOGIN_RESOLVED](state, action) {
    return Object.assign({}, state, {
      isLoggedIn: true,
      loginPending: false,
      user: action.payload
    });
  },
  [LOGIN_ERROR]: clearLogin,
  [LOGIN_FAILED]: clearLogin,
  [LOGIN_REQUESTED](state) {
    return Object.assign({}, state, {
      isLoggedIn: false,
      user: undefined
    });
  }
}, initialAuthState);

export default auth;


// actions
export const login = (username, password, usernameType) => ({
  type: LOGIN_REQUESTED,
  payload: {
    username,
    password,
    usernameType
  }
});

export const loginResolved = payload => ({
  type: LOGIN_RESOLVED,
  payload
});

export const loginError = payload => ({
  type: LOGIN_ERROR,
  payload
});

export const logout = () => ({
  type: LOGOUT_REQUESTED
});
