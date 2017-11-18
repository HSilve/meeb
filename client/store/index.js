import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import whiteboard from './whiteboard'
import notes from './notes'
import messageEntry from './messageEntry'

const reducer = combineReducers({user, notes, whiteboard, messageEntry})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './whiteboard'
export * from './notes'
export * from './messageEntry'
