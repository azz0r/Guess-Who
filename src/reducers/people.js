import defaultStateImport from '../data/people.json';
let defaultState = [
  JSON.parse(JSON.stringify(defaultStateImport)),
  JSON.parse(JSON.stringify(defaultStateImport)),
]

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'TURN_TAKEN':
       state[action.playerKey].forEach((person, index) => {
         if (person[action.question.key] && person[action.question.key] === action.question.value) {
           state[action.playerKey][index].chosen = true
         }
       })
       return state;
    default:
    break;
  }
  return state
}
