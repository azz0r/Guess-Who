import * as types from './types';

export function set(open, question = '', answer) {
  return { type: types.MODAL_TOGGLE, open, question, answer}
}
