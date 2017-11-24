import axios from 'axios'
import history from '../history'
import socket from '../socket';

/**
 * ACTION TYPES
 */
const FIND_ALL_ROOMS = 'FIND_ALL_ROOMS'
const CREATE_ROOM = 'CREATE_ROOM'
// const REMOVE_ROOM = 'REMOVE_ROOM'

/**
 * INITIAL STATE
 */
// const defaultRooms = []

/**
 * ACTION CREATORS
 */
const findAllRooms = rooms => ({ type: FIND_ALL_ROOMS, rooms })
const createRoom = room => ({ type: CREATE_ROOM, room })
// const removeRoom = () => ({type: REMOVE_ROOM})

// THUNK CREATORS

export const getRooms = user => dispatch => {
  console.log(`user: ${user}`)
  axios.get(`/api/whiteboards/myRooms/${user.id}`)
    .then(res => {
      console.log(res)
      dispatch(findAllRooms(res.data))
    })
    .catch(err => console.error('Could not find rooms!', err));
}

// export const newRoom = user => dispatch => {
//   axios.post('/api/whiteboards', { host: user.name, userId: user.id })
//     .then(res => {
//       dispatch(createRoom(res.data))
//       history.push(`/whiteboards/${res.data.id}`);
//     })
//     .catch(err => console.error('Could not create room!', err));
// };
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
        note.whiteboardId = res.data.id;
        note.userId = host.id
        note.host = host.name;
        axios.post('/api/notes', {note})
      // history.push(`/profile/${res.data.id}`);

    })
    .catch(err => console.error('Could not create room!', err));
};


// REDUCER
export default function reducer(state = [], action) {

  switch (action.type) {

    case FIND_ALL_ROOMS:
      return action.rooms

    case CREATE_ROOM:
      return [...state, action.room]

    default:
      return state;
  }

}
