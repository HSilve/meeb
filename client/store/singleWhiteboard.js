import axios from 'axios';
import history from '../history';
import socket from '../socket';

const GET_ROOM = 'GET_ROOM'
const UPDATE_ROOM = 'UPDATE_ROOM'

const getRoom = room => ({ type: GET_ROOM, room })
const updateRoom = room => ({ type: UPDATE_ROOM, room })

export const fetchRoom = (whiteboardId, userId) =>
  dispatch =>
    axios.get(`/api/whiteboards/${whiteboardId}`)
      .then(res => {
        dispatch(getRoom(res.data))
        socket.emit('enter-room', res.data.id, userId)
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

export default function reducer(state = {}, action) {

  switch (action.type) {

    case GET_ROOM:
      return action.room

    case UPDATE_ROOM:
      return action.room

    default:
      return state;
  }

}
