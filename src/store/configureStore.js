import rootReducer          from '../reducers';
import thunk                from 'redux-thunk';
import routes               from '../routes';
import { reduxReactRouter } from 'redux-router';
import createHistory        from 'history/lib/createBrowserHistory';
import DevTools             from 'containers/DevTools';
import {persistState}       from 'redux-devtools';
import {
  applyMiddleware,
  compose,
  createStore
} from 'redux';

export default function configureStore (initialState, debug = false) {
  let createStoreWithMiddleware;

  const middleware = applyMiddleware(thunk);

  if (debug) {
    createStoreWithMiddleware = compose(
      middleware,
      reduxReactRouter({ routes, createHistory }),
      DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    );
  } else {
    createStoreWithMiddleware = compose(
      middleware,
      reduxReactRouter({ routes, createHistory })
    );
  }

  const store = createStoreWithMiddleware(createStore)(
    rootReducer, initialState
  );
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
