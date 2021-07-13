
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import createRootReducer from './createRootReducer';

export const history = createBrowserHistory();

export default () => {
  const store = createStore(
    createRootReducer(history),
    compose(applyMiddleware(routerMiddleware(history))));
  return store;
};
