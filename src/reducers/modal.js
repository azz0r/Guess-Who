const defaultState = {
  open: false,
  question: ''
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'MODAL_TOGGLE':
      console.log('reducer modal toggle')
      state.open = state.open ? false : true
      state.question = action.question || ''
        break;
      default:
        break;
  }
  console.log('modal reducer final state', state)
  return state;
}
