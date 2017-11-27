import axios from 'axios'
import history from '../history'
import socket from '../socket';

/**
 * ACTION TYPES
 */
const FIND_ALL_ROOMS = 'FIND_ALL_ROOMS'
const CREATE_ROOM = 'CREATE_ROOM'
const DELETE_ROOM = 'DELETE_ROOM'

/**
 * INITIAL STATE
 */
// const defaultRooms = []

/**
 * ACTION CREATORS
 */
const findAllRooms = rooms => ({ type: FIND_ALL_ROOMS, rooms })
export const createRoom = room => ({ type: CREATE_ROOM, room })
export const deleteRoom = id => ({ type: DELETE_ROOM, id })

// THUNK CREATORS

export const getRooms = user => dispatch => {
  axios.get(`/api/whiteboards/myRooms/${user.id}`)
    .then(res => {
      console.log(res)
      dispatch(findAllRooms(res.data))
    })
    .catch(err => console.error('Could not find rooms!', err));
}

export const newRoom = (roomName, host, attendeeId, date, time, note) => dispatch => {

  axios.post('/api/whiteboards', {
    host: host.name,
    userId: host.id,
    name: roomName,
    date: date,
    startTime: time,
    attendees: attendeeId
  })
    .then(res => {
      dispatch(createRoom(res.data))
      socket.emit('new-room', res.data)
      if (note.link == '') { note.link = null; }
      note.whiteboardId = res.data.id;
      note.userId = host.id
      note.host = host.name;
      note.position = [1320, 130];
      return axios.post('/api/notes', { note })
      // history.push(`/profile/${res.data.id}`);
    })
    .then(newNote => {
      socket.emit('new-note', newNote.data)
    })
    .catch(err => console.error('Could not create room!', err));
};

export const removeRoom = (id) => dispatch => {
  axios.delete(`/api/whiteboards/${id}`)
    .then(_ => {
      dispatch(deleteRoom(id))
      socket.emit('delete-room', id)
    })
    .catch(err => console.error(`Could not remove ${id}!`, err));
}


// REDUCER
export default function reducer(state = [], action) {

  switch (action.type) {

    case FIND_ALL_ROOMS:
      return action.rooms

    case CREATE_ROOM:
      return [...state, action.room]

    case DELETE_ROOM:
      return state.filter(room => room.id !== action.id)

    default:
      return state;
  }

}
