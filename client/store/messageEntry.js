import axios from 'axios'
import socket from '../socket';

// ACTION TYPES
const POST_MESSAGE = 'POST_MESSAGE';
const GET_MESSAGES = 'GET_MESSAGES';

// ACTION CREATORS

export function postMessage (message) {
  const action = { type: POST_MESSAGE, message };
  return action;
}

export function getMessages (messages) {
  const action = { type: GET_MESSAGES, messages };
  return action;
}

// THUNK CREATORS

export function fetchMessages () {

  return function thunk (dispatch) {
    return axios.get('/api/:whiteboardId')
      .then(res => res.data)
      .then(messages => {
        const action = getMessages(messages);
        dispatch(action);
      });
  };
}

export function createMessage (message) {

  return function thunk (dispatch) {
    return axios.put('api/:whiteboardId', message)
      .then(res => res.data)
      .then(newMessage => {
        const action = postMessage(newMessage);
        dispatch(action);
        socket.emit('new-message', newMessage);
      });
  };
}

// REDUCER
export default function reducer (state = [], action) {

  switch (action.type) {

    case GET_MESSAGES:
      return action.messages;

    case POST_MESSAGE:
      return [...state, action.message];

    default:
      return state;
  }

}
