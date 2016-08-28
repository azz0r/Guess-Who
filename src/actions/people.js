import * as types from './types';

export function turnConfirmed(question, value) {
  return { type: types.TURN_TAKEN, question, value }
}
