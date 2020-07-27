import { combineReducers } from 'redux';
import auth from './auth';
import books from './books';
import notification from './notification';
import { getEndPoint } from '../config/config';


export default combineReducers({
  auth,
  books,
  notification,
  getEndPoint
})
