import * as types from './types';

export function set(open, question = '') {
  return { type: types.MODAL_TOGGLE, open, question}
}
