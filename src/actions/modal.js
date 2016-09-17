import * as types from './types';

export function set(open, question = '') {
  console.log('modal.js set')
  return { type: types.MODAL_TOGGLE, open, question}
}
