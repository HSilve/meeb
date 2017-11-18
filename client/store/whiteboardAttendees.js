import axios from 'axios'
import history from '../history'
import socket from '../socket';

/**
 * ACTION TYPES
 */
const GET_ATTENDEES= 'GET_ATTENDEES'
const UPDATE_ATTENDEES = 'UPDATE_ATTENDEES'
const REMOVE_ATTENDEES= 'REMOVE_ATTENDEES'

/**
 * INITIAL STATE
 */
const defaultAttendees = []

/**
 * ACTION CREATORS
 */
const getAttendees = attendees => ({type: GET_ATTENDEES, attendees})
const updateAttendees = attendees => ({type: UPDATE_ATTENDEES, attendees})
const removeAttendees = () => ({type: REMOVE_ATTENDEES})

 // THUNK CREATORS

 export function fetchAttendees (whiteboardId) {
   return function thunk (dispatch) {
     return axios.get(`/api/whiteboards/${whiteboardId}`)
       .then(res => res.data)
       .then(attendees => {
         const action = getAttendees(attendees);
         dispatch(action);
       });
   };
 }

 export function postAttendees (attendees) {
   return function thunk (dispatch) {
     return axios.put(`api/whiteboards/${attendees.whiteboardId}`, attendees)
       .then(res => res.data)
       .then(newAttendees => {
         const action = getAttendees(newAttendees);
         dispatch(action);
         socket.emit('new-attendees', newAttendees);
       });
   };
 }

 // REDUCER
 export default function reducer (state = [], action) {

   switch (action.type) {

     case GET_ATTENDEES:
       return [...state, action.attendees];

     case UPDATE_ATTENDEES:
       return [...state, action.attendees];

     default:
       return state;
   }

 }
