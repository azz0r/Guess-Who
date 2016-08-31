import defaultStateImport from '../data/people.json'
import arrayShuffle from 'array-shuffle'

let defaultState = [
  arrayShuffle(JSON.parse(JSON.stringify(defaultStateImport))),
  arrayShuffle(JSON.parse(JSON.stringify(defaultStateImport))),
]

export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      break;
    case 'TURN_TAKEN_PEOPLE':
       state[action.playerKey].forEach((person, index) => {
         if (person[action.question.key] && person[action.question.key] === action.question.value) {
           state[action.playerKey][index].chosen = true
         }
       })
      break
  }
  return state
}
