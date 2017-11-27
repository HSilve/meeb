import axios from 'axios';
import socket from '../socket';

let initialState = {
  list: [],
  justEntered: {}
}

const GET_COLLABORATORS = 'GET_COLLABORATORS'
const ANNOUNCE_COLLABORATOR = 'ANNOUNCE_COLLABORATOR'


export const getCollaborators = collaborators => ({ type: GET_COLLABORATORS, collaborators })
export const enterCollaborator = collaborator => ({type: ANNOUNCE_COLLABORATOR, collaborator})

export const fetchCollaborators = (whiteboardId) =>
  dispatch =>
    axios.get(`/api/attendees/${whiteboardId}`)
      .then(res => {
        dispatch(getCollaborators(res.data))
        }
      )
      .catch(err => console.log(err))

export const announceCollaborator = (userId, whiteboardId) => dispatch => {
  axios.put(`/api/attendees/${whiteboardId}`, {userId})
  .then(user => {
    socket.emit('enter-room', user.data, whiteboardId);
  })
}


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_COLLABORATORS:
      return Object.assign({}, state, {
        list: action.collaborators,
        justEntered: {}
      })
    case ANNOUNCE_COLLABORATOR:
      return Object.assign({}, state, {
        list: [...state.list.filter(co => co.id != action.collaborator.id), action.collaborator],
        justEntered: action.collaborator
      })

    default:
      return state;
  }

}
