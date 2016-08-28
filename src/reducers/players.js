import defaultState from '../data/players.json';

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'TURN_TAKEN':
      //console.log('player', state, action);
      break;
    case 'CHOSE_PERSON':
      newState[action.playerKey].chosenPerson = action.person;
      return newState;
    default:
      break;
    }
  return state
}
