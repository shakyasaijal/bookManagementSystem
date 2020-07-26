import { combineReducers } from 'redux';
import auth from './auth';
import { getEndPoint } from '../config/config';

export default combineReducers({
  auth,
  getEndPoint
})
