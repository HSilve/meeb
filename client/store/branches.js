import axios from 'axios'
import socket from '../socket';

const defaultBranches = []

const GET_BRANCHES = 'GET_BRANCHES'
const ADD_BRANCH = 'ADD_BRANCH'
const REMOVE_BRANCHES = 'REMOVE_BRANCHES'


export const getBranches = branches => ({ type: GET_BRANCHES, branches })
export const addBranch = branch => ({ type: ADD_BRANCH, branch })
export const removeBranch = noteId => ({ type: REMOVE_BRANCHES, noteId})

export const emptyBranches = whiteboardId =>
  dispatch => {
    dispatch(getBranches([]))
    socket.emit('get branches', [], whiteboardId)
  }

export const insertBranch = branchData =>
  dispatch =>
    axios.post(`/api/branches`, branchData)
      .then(branch => {
        dispatch(addBranch(branch.data))
        socket.emit('add branch', branch.data)
      })
      .catch(err => console.log(err))

export const fetchBranches = whiteboardId =>
  dispatch =>
    axios.get(`/api/branches/${whiteboardId}`)
      .then(branches => {
        console.log(whiteboardId)
        dispatch(getBranches(branches.data))
        socket.emit('get branches', branches.data, whiteboardId)
      })
      .catch(err => console.log(err))


export default function(state = defaultBranches, action) {
  switch (action.type) {
    case ADD_BRANCH:
      return [...state, action.branch]
    case GET_BRANCHES:
      console.log(action.branches)
      return action.branches
    case REMOVE_BRANCHES:
      return state.filter(branch => branch.noteId !== parseInt(10, action.noteId) && branch.endNoteId !== parseInt(10, action.noteId))
    default:
      return state
  }
}
