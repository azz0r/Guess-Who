import reducers from '../reducers'
import persistState from 'redux-localstorage'
import reduxReset from 'redux-reset'
import { batch, batching } from 'redux-batch-middleware'
import { createStore, applyMiddleware, compose } from 'redux'

const storeEnhancer = compose(
  applyMiddleware(batch),// logger),
  persistState(),
  reduxReset(),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
    : f => f
);

export default (initialState) => {
  return createStore(batching(reducers), initialState, storeEnhancer);
};
