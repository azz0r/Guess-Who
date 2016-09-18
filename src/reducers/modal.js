const defaultState = {
  open: false,
  question: '',
  answer: false,
}

export default (state = defaultState, action) => {

  switch (action.type) {
    case 'MODAL_TOGGLE':
      return Object.assign({}, {
        open: state.open ? false : true,
        question: action.question || '',
        answer: action.answer || '',
      })
    default:
      return state;  }
}
