import * as types from './types';

export function turnConfirmed(question, playerKey) {
  return { type: types.TURN_TAKEN, question, playerKey }
}
