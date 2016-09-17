const defaultState = {
  open: false,
  question: ''
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'MODAL_TOGGLE':
      state.open = !state.open
      state.question = action.question || ''
        break;
      default:
        break;
  }
  return state;
}
