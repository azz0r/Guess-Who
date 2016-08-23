import defaultState from '../data/people.json';

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'FILTER_BY':
      return state.map((person, index) => {
        if (index === action.index) {
          return Object.assign({}, person, {
            chosen: true
          })
        }
        return state
      })
    default:
      return state
  }
}
