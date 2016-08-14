import rootReducer from '../reducers';
import { createStore, compose } from 'redux';

const storeEnhancer = compose(
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
    : f => f
);
export default (initialState) => {
  return createStore(rootReducer, initialState, storeEnhancer);
};
