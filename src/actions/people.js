import * as types from './types';

export const turnTaken = (question) => {
  return { type: types.FILTER_BY, question }
}
