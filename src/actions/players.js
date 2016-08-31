import * as types from './types';

export function turnConfirmed() {
  return { type: types.TURN_TAKEN_PLAYER }
}

export function chosePerson(person, playerKey) {
  return { type: types.CHOSE_PERSON, person, playerKey }
}
