import axios from 'axios'

// ACTION TYPES

const GET_MESSAGE = 'GET_MESSAGE';
const GET_MESSAGES = 'GET_MESSAGES';
const DELETE_MESSAGE = 'DELETE_MESSAGE';
const POST_MESSAGE = 'POST_MESSAGE';


// ACTION CREATORS

export function getMessage(message) {
  const action = { type: GET_MESSAGE, message };
  return action;
}

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
//
// export function fetchMessages () {
//
//   return function thunk (dispatch) {
//     return axios.get('/api/messages')
//       .then(res => res.data)
//       .then(messages => {
//         const action = getMessages(messages);
//         dispatch(action);
//       });
//   };
// }
//
// export function postMessage (message) {
//
//   return function thunk (dispatch) {
//     return axios.post('/api/messages', message)
//       .then(res => res.data)
//       .then(newMessage => {
//         const action = getMessage(newMessage);
//         dispatch(action);
//         socket.emit('new-message', newMessage);
//       });
//   };
// }

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

export default function reducer(state = [], action) {

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
