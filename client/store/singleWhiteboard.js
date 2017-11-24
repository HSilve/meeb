import axios from 'axios';
import history from '../history';
import socket from '../socket';

const GET_ROOM = 'GET_ROOM'
const UPDATE_ROOM = 'UPDATE_ROOM'
const ANNOUNCE_USER = 'ANNOUNCE_USER'

const getRoom = room => ({ type: GET_ROOM, room })
const updateRoom = room => ({ type: UPDATE_ROOM, room })
const enterUser = user => ({type: ANNOUNCE_USER, user})

export const fetchRoom = (whiteboardId) =>
  dispatch =>
    axios.get(`/api/whiteboards/${whiteboardId}`)
      .then(res => {
        dispatch(getRoom(res.data))
        }
      )
      .catch(err => console.log(err))

export const modifyRoom = (room) => dispatch => {
  axios.put(`/api/whiteboards/${room.id}`, room)
    .then(res => {
      dispatch(updateRoom(res.data))
      socket.emit('edit-room', res.data);
    })
    .catch(err => console.error(err));
}

export const announceUser = (userId, whiteboardId) => dispatch => {
  // axios.put(`/api/attendees`)
  socket.emit('enter-room', whiteboardId, userId);
  // dispatch(enterUser(userId) )
}


export default function reducer(state = {}, action) {

  switch (action.type) {

    case GET_ROOM:
      return action.room

    case UPDATE_ROOM:
      return action.room

    case ANNOUNCE_USER:
      return Object.assign( {},
        state.users.filter(person => person.id != action.user.id), action.user
      )

    default:
      return state;
  }

}
