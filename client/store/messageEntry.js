import axios from 'axios'
import socket from '../socket';

// ACTION TYPES
const POST_MESSAGE = 'POST_MESSAGE';
const GET_MESSAGES = 'GET_MESSAGES';
const DELETE_MESSAGE = 'DELETE_MESSAGE';
const RESET_NEW_MESSAGE_COUNT = 'RESET_NEW_MESSAGE_COUNT';


// ACTION CREATORS

export const getMessages = (messages) => ({ type: GET_MESSAGES, messages })

export const deleteMessage = (id) => ({ type: DELETE_MESSAGE, id })

export const postMessage = (message) =>  ({ type: POST_MESSAGE, message, stack: new Error().stack })

export const clearNewMessageCount = () => ({type: RESET_NEW_MESSAGE_COUNT})

// THUNK CREATORS
export const fetchMessages = (id) =>
  dispatch =>
    axios.get(`/api/message/${id}`)
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

export const resetMessageCount = () => dispatch => {dispatch(clearNewMessageCount())}


export default function reducer (state = {allMessages: [], id: {}, count: 0}, action) {

  switch (action.type) {
    case GET_MESSAGES:
      return {...state, allMessages: action.messages}
    case POST_MESSAGE:
      return {...state, allMessages: [action.message, ...state.allMessages], count: state.count + 1}
    case RESET_NEW_MESSAGE_COUNT:
      return {...state, count: 0}
    default:
      return state;
  }
}
