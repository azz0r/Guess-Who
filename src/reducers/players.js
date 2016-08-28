import defaultState from '../data/players.json';

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'TURN_TAKEN':
      console.log('player', state, action);
      break;
    case 'CHOSE_PERSON':
      state[action.playerKey].chosenPerson = action.person;
      break;
    default:
      break;
    }
  return state
}
