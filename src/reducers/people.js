import defaultStateImport from '../data/people.json';
let defaultState = [
  JSON.parse(JSON.stringify(defaultStateImport)),
  JSON.parse(JSON.stringify(defaultStateImport)),
]

export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      break;
    case 'TURN_TAKEN':
       state[action.playerKey].forEach((person, index) => {
         if (person[action.question.key] && person[action.question.key] === action.question.value) {
           state[action.playerKey][index].chosen = true
         }
       })
      break
  }
  return state
}
