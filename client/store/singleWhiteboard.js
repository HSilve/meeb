import axios from 'axios';
import history from '../history';
import socket from '../socket';

const GET_ROOM = 'GET_ROOM'
const UPDATE_ROOM = 'UPDATE_ROOM'
const CLOSE_ROOM = 'CLOSE_ROOM'

const getRoom = room => ({ type: GET_ROOM, room })
const updateRoom = room => ({ type: UPDATE_ROOM, room })
export const destroyRoom = room => ({type: CLOSE_ROOM, room})

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
export const closeRoom = (id) => dispatch => {
  axios.put(`/api/whiteboards/${id}`, {endTime: Date.now()})
  .then(res => {
    dispatch(destroyRoom(res.data))
    socket.emit('close-room', res.data)
  })
  .catch(err => console.error(err));
}
export default function reducer(state = {}, action) {

  switch (action.type) {

    case GET_ROOM:
      return action.room

    case UPDATE_ROOM:
      return action.room

    case CLOSE_ROOM:
      return action.room

    default:
      return state;
  }

}
