import axios from 'axios'

// ACTION TYPES
const WRITE_MESSAGE = 'WRITE_MESSAGE';

// ACTION CREATORS
export function writeMessage (content) {
  const action = { type: WRITE_MESSAGE, content };
  return action;
}

// REDUCER
export default function reducer (state = {writeMessage: '', sendMessage: {}}, action) {

  switch (action.type) {

    case WRITE_MESSAGE:
      return Object.assign({}, state, {writeMessage: action.content});

    default:
      return state;
  }

}
