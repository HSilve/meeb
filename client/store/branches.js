import axios from 'axios'

const defaultBranches = []

const GET_BRANCHES = 'GET_BRANCHES'
const ADD_BRANCH = 'ADD_BRANCH'


const getBranches = branches => ({ type: GET_BRANCHES, branches })
const addBranch = branch => ({ type: ADD_BRANCH, branch })


export const insertBranch = branchData =>
  dispatch =>
    axios.post(`/api/branches`, branchData)
      .then(branch => dispatch(addBranch(branch.data)))
      .catch(err => console.log(err))

export const fetchBranches = whiteBoardId =>
  dispatch =>
    axios.get(`/api/branches/${whiteBoardId}`)
      .then(branches => dispatch(getBranches(branches.data)))
      .catch(err => console.log(err))


export default function(state = defaultBranches, action) {
  switch (action.type) {
    case ADD_BRANCH:
      return [...state, action.branch]
    case GET_BRANCHES:
      console.log(action.branches)
      return action.branches
    default:
      return state
  }
}
