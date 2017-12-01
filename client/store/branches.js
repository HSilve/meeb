import axios from 'axios'
import socket from '../socket';

const defaultBranches = []

const GET_BRANCHES = 'GET_BRANCHES'
const ADD_BRANCH = 'ADD_BRANCH'
const REMOVE_BRANCHES = 'REMOVE_BRANCHES'


export const getBranches = (branches, whiteboardId) => {
  console.log(branches)
  if (branches.length === 0) socket.emit('get branches', branches || [], whiteboardId)
  return { type: GET_BRANCHES, branches }
}
export const addBranch = branch => ({ type: ADD_BRANCH, branch })

export const removeBranch = (noteId, whiteboardId) => {
  socket.emit('remove branch', noteId, whiteboardId)
  return { type: REMOVE_BRANCHES, noteId}
}


export const insertBranch = branchData =>
  dispatch =>
    axios.post(`/api/branches`, branchData)
      .then(branch => {
        dispatch(addBranch(branch.data))
        socket.emit('add branch', branch.data)
      })
      .catch(err => console.log(err))

export const fetchBranches = whiteBoardId =>
  dispatch =>
    axios.get(`/api/branches/${whiteBoardId}`)
      .then(branches => {                             dispatch(getBranches(branches.data))
      socket.emit('get branches', branches.data, whiteBoardId)

      })
      .catch(err => console.log(err))


export default function(state = defaultBranches, action) {
  switch (action.type) {
    case ADD_BRANCH:
      return [...state, action.branch]
    case GET_BRANCHES:
      console.log('in get branches reducer')
      return action.branches
    case REMOVE_BRANCHES:
      return state.filter(branch => branch.noteId !== parseInt(10, action.noteId) && branch.endNoteId !== parseInt(10, action.noteId))
    default:
      return state
  }
}
