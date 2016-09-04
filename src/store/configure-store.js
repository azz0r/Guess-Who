import reducers from '../reducers';
// import persistState from 'redux-localstorage';
import { batch, batching } from 'redux-batch-middleware';
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';

const logger = createLogger();

const storeEnhancer = compose(
  applyMiddleware(batch),// logger),
  // persistState(),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
    : f => f
);

export default (initialState) => {
  return createStore(batching(reducers), initialState, storeEnhancer);
};
