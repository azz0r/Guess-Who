import People from '../data/wrestlers.json';

export default (state = People, action) => {
  switch (action.type) {
    case 'GUESS_TAKEN':
      return state.map((person, index) => {
        if (index === action.index) {
          return Object.assign({}, person, {
            chosen: true
          })
        }
        return person
      })
    default:
      return state
  }
}
