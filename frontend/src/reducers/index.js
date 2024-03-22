import { combineReducers } from 'redux';
import lettersReducer from './letters-reducer';
import userReducer from './user-reducer';

export default combineReducers({
  lettersReducer,
  userReducer,
});
