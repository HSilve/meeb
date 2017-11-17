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

/**
 * THUNK CREATORS
 */
 export function getAttendees (attendees) {
   const action = { type: GET_ATTENDEES, attendees };
   return action;
 }

 export function getAttendees (attendees) {
   const action = { type: GET_ATTENDEES, attendees };
   return action;
 }

 // THUNK CREATORS

 export function fetchAttendeess () {

   return function thunk (dispatch) {
     return axios.get('/api/:whiteboardId')
       .then(res => res.data)
       .then(attendees => {
         const action = getAttendeess(attendees);
         dispatch(action);
       });
   };
 }

 export function postAttendees (attendees) {

   return function thunk (dispatch) {
     return axios.put('api/:whiteboardId', attendees)
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

     case GET_ATTENDEE:
       return [...state, action.attendees];

     default:
       return state;
   }

 }
