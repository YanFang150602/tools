import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { reducerOne } from './reducer';

const createRootReducer = (history) => combineReducers({
  one: reducerOne,
  router: connectRouter(history),
});

export default createRootReducer;
