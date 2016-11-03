import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { loginResolved, loginError, LOGIN_REQUESTED } from '../reducers/auth';

export default function login(action$) {
  return action$.ofType(LOGIN_REQUESTED)
    .switchMap(({ payload }) =>
      ajax.post(process.env.REACT_APP_BACKEND_URL, {
        login_type: payload.usernameType,
        login: payload.username,
        password: payload.password,
        event: 'login'
      }, {
        'Content-Type': 'application/json',
        v3api: '1'
      })
        .map(res => loginResolved(res.response))
    )
    .catch(err => Observable.of(loginError(err.message)));
}
