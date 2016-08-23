import * as types from './types';

export function turnConfirmed() {
  return { type: types.PLAYER_TURN, success: true }
}
