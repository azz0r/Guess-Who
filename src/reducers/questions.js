import defaultStateImport from '../data/questions.json';
import arrayShuffle from 'array-shuffle';
let defaultState = [
  JSON.parse(JSON.stringify(defaultStateImport)),
  JSON.parse(JSON.stringify(defaultStateImport)),
]

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'QUESTION_USED':
      state[action.playerKey].forEach((question, index) => {
        if (question === action.question) {
          state[action.playerKey][index].chosen = true;
        }
      })
      return state;
      break;
      default:
    break;
  }
  return arrayShuffle(state);
}
