import defaultStateImport from '../data/people.json';
import arrayShuffle from 'array-shuffle';
let defaultState = [
  JSON.parse(JSON.stringify(defaultStateImport)),
  JSON.parse(JSON.stringify(defaultStateImport)),
]

export default (state = arrayShuffle(defaultState), action) => {
  switch (action.type) {
    case 'TURN_TAKEN':
       return state.map((people) => {
         return people.map((person) => {
          if (person[action.question.key]
            && person[action.question.key] === action.question.value) {
            person.chosen = true
          }
          return person
        })
      })
    default:
    break;
  }
  return state
}
