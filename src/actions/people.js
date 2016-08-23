import * as types from './types';

export function turnConfirmed(question) {
  return { type: types.FILTER_BY, question }
}
