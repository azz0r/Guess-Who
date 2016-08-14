import * as types from '../actions/action-types';

export default (state = [], action) => {
  switch (action.type) {
    case types.ADD_WRESTLER:
      return [...state, Object.assign({}, action.wrestler)];
    default:
      return state;
  }
};
