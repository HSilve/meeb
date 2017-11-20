import axios from 'axios'
import history from '../history'
import socket from '../socket';

/**
 * ACTION TYPES
 */
const FIND_ALL_ROOMS = 'FIND_ALL_ROOMS'
const CREATE_ROOM = 'CREATE_ROOM'
const GET_ROOM = 'GET_ROOM'
const UPDATE_ROOM = 'UPDATE_ROOM'
// const REMOVE_ROOM = 'REMOVE_ROOM'

/**
 * INITIAL STATE
 */
// const defaultRooms = []

/**
 * ACTION CREATORS
 */
const findAllRooms = rooms => ({ type: FIND_ALL_ROOMS, rooms })
const createRoom = user => ({ type: CREATE_ROOM, user })
const getRoom = room => ({ type: GET_ROOM, room })
const updateRoom = room => ({ type: UPDATE_ROOM, room })
// const removeRoom = () => ({type: REMOVE_ROOM})

// THUNK CREATORS

export const getRooms = user => dispatch => {
  axios.get(`/api/whiteboards/${user.id}`)
    .then(res => {
      dispatch(findAllRooms(res.data))
    })
    .catch(err => console.error('Could not find rooms!', err));
}

export const newRoom = user => dispatch => {
  axios.post('/api/whiteboards', { host: user.name, userId: user.id })
    .then(res => {
      dispatch(createRoom(res.data))
      history.push(`/whiteboards/${res.data.id}`);
    })
    .catch(err => console.error('Could not create room!', err));
};

export const fetchRoom = (whiteboardId) =>
  dispatch =>
    axios.get(`/api/whiteboards/${whiteboardId}`)
      .then(res => dispatch(getRoom(res.data)))
      .catch(err => console.log(err))

export const modifyRoom = (room) => dispatch => {
  axios.put(`/api/whiteboards/${room.id}`, room)
    .then(res => {
      dispatch(updateRoom(res.data))
      socket.emit('updated-room', res.data);
    })
    .catch(err => console.error(err));
}


// REDUCER
export default function reducer(state = [], action) {

  switch (action.type) {

    case FIND_ALL_ROOMS:
      return action.rooms

    case CREATE_ROOM:
      return [...state, action.room]

    case GET_ROOM:
      return state.map(room => (
        action.room.id === room.id ? action.room : room
      ));

    case UPDATE_ROOM:
      return state.map(room => (
        action.room.id === room.id ? action.room : room
      ));

    default:
      return state;
  }

}
