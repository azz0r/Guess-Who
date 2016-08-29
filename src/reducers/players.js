import defaultState from '../data/players.json';

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'TURN_TAKEN_PLAYER':
      newState.forEach((player, key) => {
        newState[key].currentTurn = !newState[key].currentTurn
      })
      return newState;
      break;
    case 'CHOSE_PERSON':
      newState[action.playerKey].chosenPerson = action.person;
      return newState;
    default:
      break;
    }
  return state
}
