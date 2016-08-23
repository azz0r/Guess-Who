import defaultState from '../data/players.json';

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'TURN_TAKEN':
      console.log('player', state, action);
      break;
    default:
      break;
    }
  return state
}
