/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from './reducers';
// import rootEpic from './epics';

const epicMiddleware = createEpicMiddleware(require('./epics').default); // eslint-disable-line global-require

export default function configureStore() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(
        epicMiddleware
      )
    )
  );

  if (module.hot) {
    module.hot.accept('./epics', () => {
      epicMiddleware.replaceEpic(require('./epics').default); // eslint-disable-line global-require
    });

    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers')); // eslint-disable-line global-require
    });
  }

  return store;
}

