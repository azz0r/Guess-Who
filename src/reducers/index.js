import people from './people.js';
import players from './players.js';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  people,
  players
});

export default rootReducer;
