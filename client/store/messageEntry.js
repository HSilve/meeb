import axios from 'axios'
import socket from '../socket';

// ACTION TYPES
const POST_MESSAGE = 'POST_MESSAGE';
const GET_MESSAGES = 'GET_MESSAGES';
const DELETE_MESSAGE = 'DELETE_MESSAGE';
const POST_MESSAGE = 'POST_MESSAGE';


// ACTION CREATORS

export function getMessages(messages) {
  const action = { type: GET_MESSAGES, messages };
  return action;
}

export function deleteMessage(id) {
  const action = { type: DELETE_MESSAGE, id };
  return action;
}

export function postMessage(message) {
  const action = { type: POST_MESSAGE, message };
  return action;
}

// THUNK CREATORS

export const fetchMessages = (whiteboardId) => {
  dispatch =>
    axios.get(`/api/whiteboards/${whiteboardId}`)
      .then(res =>
        dispatch(getMessages(res.data)))
      .catch(err => console.log(err))
}

export const addMessage = (message, whiteboardId) => dispatch => {
  axios.post(`/${whiteboardId}/message`, message)
    .then(res => dispatch(postMessage(res.data)))
    .catch(err => console.error(`Could not create ${message}!`, err));
};

export const removeMessage = id => dispatch => {
  dispatch(deleteMessage(id));
  axios.delete(`/api/message/${id}`)
    .catch(err => console.error(`Could not remove ${id}!`, err));
};


// REDUCER
export default function reducer (state = [], action) {

  switch (action.type) {

    case GET_MESSAGES:
      return action.messages;

    case GET_MESSAGE:
      return action.message;

    case DELETE_MESSAGE:
      return state.filter(message => message.id != action.id);

    case POST_MESSAGE:
      return [...state, action.message]

    default:
      return state;
  }

}
