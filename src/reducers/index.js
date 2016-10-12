import players from './players.js';
import questions from './questions.js';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  questions,
  players,
});

export default rootReducer;
