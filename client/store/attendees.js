import axios from 'axios';
import socket from '../socket';

//list dummy data
// list: [ {name: 'Waylon Dalton', id: 90},
// {name: 'Justine Henderson', id: 91},
// {name: 'Abdullah Lang', id: 92},
// {name: 'Marcus Cruz', id: 93},
// {name: 'Thalia Cobb', id: 94},
// {name: 'Mathias Little', id: 95},
// {name: 'Eddie Randolph', id: 96},
// {name: 'Angela Walker', id: 97}],


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
        list: [...state.list, state.invited.filter(co => co.id === action.cId)[0]].sort(compare)
      })
    case HIDE_COLLABORATOR:
      return Object.assign({}, state, {
        list: state.list.filter(co => co.id !== action.cId).sort(compare)
      })
    case ANNOUNCE_COLLABORATOR:
      return Object.assign({}, state, {
        list: [...state.list, action.collaborator].sort(compare),
        justEntered: action.collaborator.name
      })
    case ANNOUNCE_SELF:
    return Object.assign({}, state, {
        list: [...state.list, action.collaborator].sort(compare)
      })
    case DENNOUNCE_COLLABORATOR:
    return Object.assign({}, state, {
      justEntered: ''
    })
    default:
      return state;
  }

}


function compare(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  // a must be equal to b
  return 0;
}
