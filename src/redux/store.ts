import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import storeHolder from '@lib/storeHolder';
import { IUIConfig } from '@interface/ui-config';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import { UserState } from './user/reducers';
import { BannerState } from './banner/reducers';

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== 'production') {
    const composeEnhancers =
      process.browser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;
    return composeEnhancers(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function configureStore(initialState: any) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  ) as any;

  store.sagaTask = sagaMiddleware.run(rootSaga);

  storeHolder.setStore(store);

  return store;
}

export default configureStore;

export type RootState = {
  ui: IUIConfig;
  user: UserState;
  banner: BannerState;
};
