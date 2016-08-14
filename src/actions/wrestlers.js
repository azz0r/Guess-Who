import * as types from './action-types';

export const addWrestler = (wrestler) => {
  return {
    type: types.ADD_WRESTLER,
    wrestler
  };
}
