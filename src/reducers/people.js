import defaultState from '../data/people.json';

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'FILTER_BY':
       return state.map((person, index) => {
        if (person[action.question.field] === action.question.value) {
          person.chosen = true
        }
        return person;
      })
    default:
      return state
  }
}
