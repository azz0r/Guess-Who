import * as types from './types';

export function turnConfirmed(playerKey) {
  return { type: types.TURN_TAKEN_PLAYER, playerKey }
}

export function chosePerson(person, playerKey) {
  return { type: types.CHOSE_PERSON, person, playerKey }
}
