import { getQuestions } from '../components/who/helpers';

export default (state = {}, action) => {
  console.log(state);
  return getQuestions()
}
