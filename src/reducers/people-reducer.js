import * as types from '../actions/action-types';
import People from '../data/wrestlers.json';

export default (state = People, action) => {
  switch (action.type) {
    case types.ADD_PERSON:
      return [...state, Object.assign({}, action.person)];
    default:
      return state;
  }
};
