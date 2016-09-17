import players from './players.js';
import questions from './questions.js';
import modal from './modal.js';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  questions,
  players,
  modal,
});

export default rootReducer;
