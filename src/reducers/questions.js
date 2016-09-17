import defaultStateImport from '../data/questions.json';
import arrayShuffle from 'array-shuffle'
let defaultState = [
  arrayShuffle(JSON.parse(JSON.stringify(defaultStateImport))),
  arrayShuffle(JSON.parse(JSON.stringify(defaultStateImport))),
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
