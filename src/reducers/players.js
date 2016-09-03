import playersCollection from '../data/players.json';
import peopleCollection from '../data/people.json';
import arrayShuffle from 'array-shuffle'

let defaultState = playersCollection;
defaultState[0].people = arrayShuffle(JSON.parse(JSON.stringify(peopleCollection)))
defaultState[1].people = arrayShuffle(JSON.parse(JSON.stringify(peopleCollection)))

console.log(defaultState, 'defaultState')
export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    default:
      break;
    case 'TURN_TAKEN':
      newState.forEach((player, key) => {
        newState[key].currentTurn = !newState[key].currentTurn
        player.people.forEach((person, personKey) => {
          if (
            person[action.question.key] &&
            person[action.question.key] === action.question.value &&
            person.id !== newState[action.enemyId].chosenPerson.id) {
            newState[key].people[personKey].chosen = true
          }
        })
      })
      return newState;
    case 'CHOSE_PERSON':
      newState[action.playerKey].chosenPerson = action.person;
      return newState;
    }
  return state
}
