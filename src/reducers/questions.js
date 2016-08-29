import defaultStateImport from '../data/questions.json';
let defaultState = [
  JSON.parse(JSON.stringify(defaultStateImport)),
  JSON.parse(JSON.stringify(defaultStateImport)),
]

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'QUESTION_USED':
      state[action.playerKey].forEach((question, index) => {
        if (question === action.question) {
          state[action.playerKey][index].used = true;
        }
      })
      break;
      default:
    break;
  }
  return state;
}
