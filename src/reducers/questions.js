import defaultState from '../data/questions.json';
import arrayShuffle from 'array-shuffle';

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'TURN_TAKEN':

      break;
      default:
    break;
  }
  return arrayShuffle(state);
}
