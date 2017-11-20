import axios from 'axios'
import socket from '../socket';

// ACTION TYPES
const POST_MESSAGE = 'POST_MESSAGE';
const GET_MESSAGES = 'GET_MESSAGES';
const DELETE_MESSAGE = 'DELETE_MESSAGE';


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
  const action = { type: POST_MESSAGE, message, stack: new Error().stack };
  return action;
}

// THUNK CREATORS

export const fetchMessages = () =>
  dispatch =>
    axios.get(`/api/message`)
      .then(res =>
        dispatch(getMessages(res.data)))
      .catch(err => console.log(err))


export const addMessage = (message) => dispatch => {
  axios.post(`/api/message`, message)
    .then(res => res.data)
    .then(newMessage => {
    dispatch(postMessage(newMessage))
    socket.emit('new-message', newMessage)
  })
}


export const removeMessage = id => dispatch => {
  dispatch(deleteMessage(id));
  axios.delete(`/api/message/${id}`)
    .catch(err => console.error(`Could not remove ${id}!`, err));
};


// REDUCER
export default function reducer (state = {allMessages: [], id: {}}, action) {

  switch (action.type) {

    case GET_MESSAGES:
      return {...state, allMessages: action.messages}

    // case DELETE_MESSAGE:
    //   return state.filter(message => message.id !== action.id);

    case POST_MESSAGE:
      return {...state, allMessages: state.allMessages.concat(action.message)}

    default:
      return state;
  }

}
