import axios from 'axios';

const GET_GROUP = 'GET_GROUP';
const ADD_MEMBER = 'ADD_MEMBER';
const REMOVE_MEMBER = 'REMOVE_MEMBER';
const CHANGE_ADMIN = 'CHANGE_ADMIN';
const CHANGE_NAME = 'CHANGE_NAME';
const DELETE_GROUP = 'DELETE_GROUP';


export const getGroup = (group) => ({type: GET_GROUP, group});
export const addMember = (mem) => ({type: ADD_MEMBER, mem});
export const removeMember = (memId) => ({type: REMOVE_MEMBER, memId});
export const changeAdmin = (memId) => ({type: CHANGE_ADMIN, memId});
export const changeName = (newName) => ({type: CHANGE_NAME, newName});
export const deleteGroup = () => ({type: DELETE_GROUP});


export const fetchGroup = id => dispatch => {
  axios.get(`/api/group/${id}`)
  .then(res => res.data)
  .then(group => dispatch(getGroup(group)))
  .catch(err => err)
}

export const putGroup = (groupId, memberId, remove = false) => dispatch => {
  axios.put(`/api/group/${id}`)
  .then(res => res.data)
  .then(group => dispatch(getGroup(group)))
  .catch(err => err)
}

