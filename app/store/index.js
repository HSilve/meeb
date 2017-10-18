import { createStore, applyMiddleware } from 'redux';
import loggingMiddleware, {createLogger} from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import rootReducer from '../reducer';

export default createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger({ collapsed: true })
  )
);
