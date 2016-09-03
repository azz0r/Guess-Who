import * as types from './types';

export function turnConfirmed(question, playerKey, enemyId) {
  return { type: types.TURN_TAKEN, question, playerKey, enemyId }
}

export function chosePerson(person, playerKey) {
  return { type: types.CHOSE_PERSON, person, playerKey }
}
