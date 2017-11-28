import axios from 'axios'

const defaultSingleBranch = {}

const GET_SINGLE_BRANCH = 'GET_SINGLE_BRANCH'

export const getSingleBranch = branch => ({ type: GET_SINGLE_BRANCH, branch })

export const fetchSingleBranch = branchData =>
  dispatch =>
    axios.get(`/api/branches/${branchData.whiteboardId}/${branchData.noteId}/${branchData.endNoteId}`)
      .then(branch => dispatch(getSingleBranch(branch.data)))
      .catch(err => console.log(err))

export default function(state = defaultSingleBranch, action) {
  switch (action.type) {
    case GET_SINGLE_BRANCH:
      return action.branch
    default:
      return state
  }
}
