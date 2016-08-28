import defaultStateImport from '../data/questions.json';
import arrayShuffle from 'array-shuffle';
let defaultState = [
  JSON.parse(JSON.stringify(defaultStateImport)),
  JSON.parse(JSON.stringify(defaultStateImport)),
]

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'TURN_TAKEN':

      break;
      default:
    break;
  }
  return arrayShuffle(state);
}
