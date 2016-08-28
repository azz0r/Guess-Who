import FilterStrings from '../data/questions.json';

export default (state = FilterStrings, action) => {
  switch (action.type) {
    case 'TURN_TAKEN':
      console.log('questions reducer', action);
      break;
      default:
    break;
  }
return state
}
