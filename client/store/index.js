import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import whiteboardAttendees from './whiteboardAttendees'
import conferenceRoom from './conference-room'
import notes from './notes'
import messageEntry from './messageEntry'

const reducer = combineReducers({user, notes, whiteboardAttendees,
  conferenceRoom, messageEntry})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './whiteboardAttendees'
export * from './notes'
export * from './conference-room'
export * from './messageEntry'
