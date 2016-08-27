import * as types from './types';

export function turnConfirmed(question) {
  return { type: types.TURN_TAKEN, question }
}
