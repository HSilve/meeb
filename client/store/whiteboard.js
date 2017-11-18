import axios from 'axios'
import history from '../history'
import socket from '../socket';

/**
 * ACTION TYPES
 */
const GET_ROOM = 'GET_ROOM'
// const UPDATE_ROOM = 'UPDATE_ROOM'
// const REMOVE_ROOM = 'REMOVE_ROOM'

/**
 * INITIAL STATE
 */
// const defaultRooms = []

/**
 * ACTION CREATORS
 */
const getRoom = room => ({type: GET_ROOM, room})
// const updateRoom = room => ({type: UPDATE_ROOM, room})
// const removeRoom = () => ({type: REMOVE_ROOM})

 // THUNK CREATORS

export const fetchRoom = (whiteboardId) =>
  dispatch =>
    axios.get(`/api/whiteboards/${whiteboardId}`)
       .then(res => dispatch(getRoom(res.data)))
       .catch(err => console.log(err))

 // export function modifyRoom (room) {
 //   return function thunk (dispatch) {
 //     return axios.put(`api/${room.id}`, room)
 //       .then(res => res.data)
 //       .then(updatedRoom => {
 //         const action = updateRoom(updatedRoom);
 //         dispatch(action);
 //         socket.emit('updated-room', updatedRoom);
 //       });
 //   };
 // }

 // REDUCER
 export default function reducer (state = {}, action) {

   switch (action.type) {

     case GET_ROOM:
       return action.room;

    //  case UPDATE_ROOM:
    //    return [...state, action.room];

     default:
       return state;
   }

 }
