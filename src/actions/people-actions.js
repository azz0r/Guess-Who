import * as types from './action-types';

export const turnTaken = (question) => {
  return { type: types.FILTER_BY, question }
}
