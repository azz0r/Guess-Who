import playersCollection from '../data/players.json';
import peopleCollection from '../data/people.json';
import arrayShuffle from 'array-shuffle'

let defaultState = playersCollection;
defaultState[0].people = arrayShuffle(JSON.parse(JSON.stringify(peopleCollection)))
defaultState[1].people = arrayShuffle(JSON.parse(JSON.stringify(peopleCollection)))

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    default:
      break;
    case 'TURN_TAKEN':
      // switch turns
      newState.forEach((player, key) => {
        newState[key].currentTurn = !newState[key].currentTurn
      })

      // put the current persons player on a shorter strong
      let wouldThisEliminateTheEnemy = false,
        chosenPerson = newState[action.enemyId].chosenPerson

      // if they have the same attribute as the question knock them down
      if (
        chosenPerson[action.question.key] &&
        chosenPerson[action.question.key] === action.question.value
      ) {
        wouldThisEliminateTheEnemy = true
      }

      const checkPersonHasValue = (person, key, value) => {
        return Boolean(person[key] && person[key].value && person[key].value === value)
      }

      const setPersonChosen = (playerKey, peopleKey) => {
        newState[playerKey].people[peopleKey].chosen = true
      }

      console.log('would eliminate the enemy', wouldThisEliminateTheEnemy)

      newState[action.playerKey].people.forEach((person, key) => {
        let personHasValue = checkPersonHasValue(person, action.question.key, action.question.value);
        if (
          (wouldThisEliminateTheEnemy === true && personHasValue === true)
           ||
           (wouldThisEliminateTheEnemy === false && personHasValue === false)
       ) {
          console.log(wouldThisEliminateTheEnemy, personHasValue, person.name, action.question.question)
          setPersonChosen(action.playerKey, key)
        }
      })
      return newState;
    case 'CHOSE_PERSON':
      newState[action.playerKey].chosenPerson = action.person;
      return newState;
    }
  return state
}
