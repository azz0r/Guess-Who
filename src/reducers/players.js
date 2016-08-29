import defaultState from '../data/players.json';

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    default:
      break;
    case 'TURN_TAKEN_PLAYER':
      newState.forEach((player, key) => {
        newState[key].currentTurn = !newState[key].currentTurn
      })
      return newState;
    case 'CHOSE_PERSON':
      newState[action.playerKey].chosenPerson = action.person;
      return newState;
    }
  return state
}
