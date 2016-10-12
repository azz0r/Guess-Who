import * as types from './types';

export function questionUsed(question, playerKey) {
  return { type: types.QUESTION_USED, question, playerKey }
}
