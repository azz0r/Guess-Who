import * as types from './types';

export function turnConfirmed(question, playerKey) {
  return { type: types.TURN_TAKEN, question, playerKey }
}

export function chosePerson(person, playerKey) {
  return { type: types.CHOSE_PERSON, person, playerKey }
}
