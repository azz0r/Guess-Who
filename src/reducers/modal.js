const defaultState = {
  open: false,
  question: ''
}

export default (state = defaultState, action) => {

  switch (action.type) {
    case 'MODAL_TOGGLE':
      return Object.assign({}, {
        open: state.open ? false : true,
        question: action.question || '',
      })
    break;
    default:
    break;
  }
  return state;
}
