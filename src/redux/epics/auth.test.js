import { TestScheduler } from 'rxjs/testing/TestScheduler';
import { ActionsObservable } from 'redux-observable';

import authEpic from './auth';
import { LOGIN_REQUESTED, LOGIN_RESOLVED } from '../reducers/auth';

let originalFetch;

describe('Epic:Auth', () => {
  beforeAll(() => {
    originalFetch = window.fetch;
  });

  afterAll(() => {
    window.fetch = originalFetch;
  });

  it('should dispatch LOGIN_RESOLVED', (done) => {
    const expectedPayload = { id: '1234' };
    const mockResponse = (status, statusText, response) => {
      return new window.Response(response, {
        status,
        response,
        headers: {
          'Content-type': 'application/json',
        },
      });
    };
    window.fetch = jest.fn().mockImplementation(
      () => Promise.resolve(mockResponse(200, null, JSON.stringify(expectedPayload)))
    );

    const scheduler = new TestScheduler((actual, expected) => expect(actual).toEqual(expected));
    const action = {
      type: LOGIN_REQUESTED,
      payload: {
        usernameType: 'meh',
        username: 'foo',
        password: 'bar',
      },
    };
    const action$ = new ActionsObservable(scheduler.createHotObservable('(a|)', { a: action }));
    authEpic(action$).subscribe(
      (val) => {
        try {
          expect(val).toEqual({ payload: expectedPayload, type: LOGIN_RESOLVED });
        } catch (err) {
          // try/catch is necessary because Jest expect() throws - https://github.com/facebook/jest/issues/1873
          done.fail(err);
        }
      },
      err => done.fail(err),
      () => done()
    );
    scheduler.flush();
  });
});
