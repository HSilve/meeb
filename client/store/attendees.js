import axios from 'axios';
import socket from '../socket';

let initialState = {
  list: [],
  justEntered: '',
  invited: []
}

const SHOW_COLLABORATOR = 'SHOW_COLLABORATOR';
const HIDE_COLLABORATOR = 'HIDE_COLLABORATOR';
const ANNOUNCE_COLLABORATOR = 'ANNOUNCE_COLLABORATOR';
const DENNOUNCE_COLLABORATOR = 'DENNOUNCE_COLLABORATOR';
const ANNOUNCE_SELF = 'ANNOUNCE_SELF';
const GET_INVITED = 'GET_INVITED';

export const markCollaboratorPresent = cId => ({ type: SHOW_COLLABORATOR, cId });
export const markCollaboratorAbsent = cId => ({type: HIDE_COLLABORATOR, cId})
export const enterCollaborator = collaborator => ({type: ANNOUNCE_COLLABORATOR, collaborator})
export const clearOldCollaborator = () => ({type: DENNOUNCE_COLLABORATOR})
export const enterSelf = collaborator => ({type: ANNOUNCE_SELF, collaborator})
export const getInvitees = invitees => ({type: GET_INVITED, invitees});

export const fetchCollaborators = (whiteboardId) => _ => socket.emit('roll-call', whiteboardId);

export const fetchInvited = whiteboardId => dispatch =>
axios.get(`/api/attendees/${whiteboardId}`)
  .then(res => {
    dispatch(getInvitees(res.data))
    }
  )
  .catch(err => console.log(err))
export const leaveRoom = (userId, whiteboardId) => _ => {
  socket.emit('leave-room', userId, whiteboardId)
}
export const rollCall = (userId) => dispatch => dispatch(markCollaboratorPresent(userId));

export const announceCollaborator = (userId, whiteboardId) => dispatch => {
  axios.put(`/api/attendees/${whiteboardId}`, {userId})
  .then(user => {
    dispatch(enterSelf(user.data))
    socket.emit('enter-room', user.data, whiteboardId);
    socket.emit('roll-call', whiteboardId);
  })
}

export const denounceCollaborator = () => dispatch => {dispatch(clearOldCollaborator());}


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_INVITED:
      return Object.assign({}, state, {
        invited: action.invitees,
        justEntered: ''
      })
    case SHOW_COLLABORATOR:
      return Object.assign({}, state, {
        list: [...state.list, state.invited.filter(co => co.id === action.cId)[0]]
      })
    case HIDE_COLLABORATOR:
      return Object.assign({}, state, {
        list: state.list.filter(co => co.id !== action.cId)
      })
    case ANNOUNCE_COLLABORATOR:
      return Object.assign({}, state, {
        list: [...state.list, action.collaborator],
        justEntered: action.collaborator.name
      })
    case ANNOUNCE_SELF:
    return Object.assign({}, state, {
        list: [...state.list, action.collaborator]
      })
    case DENNOUNCE_COLLABORATOR:
    return Object.assign({}, state, {
      list: [...state.list],
      justEntered: ''
    })
    default:
      return state;
  }

}
