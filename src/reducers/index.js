import people from './people.js';
import players from './players.js';
import questions from './questions.js';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  people,
  questions,
  players
});

export default rootReducer;
