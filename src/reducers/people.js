import defaultState from '../data/people.json';
import arrayShuffle from 'array-shuffle';

export default (state = arrayShuffle(defaultState), action) => {
  switch (action.type) {
    case 'TURN_TAKEN':
       return state.map((person, index) => {
        if (person[action.question.key] && person[action.question.key] === action.value) {
          person.chosen = true
        }
        return person
      })
    default:
    break;
  }
  return state
}
