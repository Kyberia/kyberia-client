import 'whatwg-fetch';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { loginResolved, loginError, LOGIN_REQUESTED } from '../reducers/auth';

export default function login(action$) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    v3api: '1',
  };
  return action$
    .ofType(LOGIN_REQUESTED)
    .mergeMap(({ payload }) =>
      fetch(process.env.REACT_APP_BACKEND_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          login_type: payload.usernameType,
          login: payload.username,
          password: payload.password,
          event: 'login',
        }),
      })
        .then(response => response.json())
    )
    .map(loginResolved)
    .catch(err => Observable.of(loginError(err.message)));
}
