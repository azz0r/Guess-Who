import * as types from './action-types';

export const guessTaken = (person) => {
  return {
    type: types.GUESS_TAKEN,
    person
  };
}
