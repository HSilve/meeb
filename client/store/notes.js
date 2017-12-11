import axios from 'axios'
import { removeBranch, fetchBranches } from './index'
import socket from '../socket';

const GET_NOTES = 'GET_NOTES'
const INSERT_NOTE = 'INSERT_NOTE'
const REMOVE_NOTE = 'REMOVE_NOTE'
const UPDATE_NOTE = 'UPDATE_NOTE'
const defaultNotes = []

export const getNotes = notes => ({ type: GET_NOTES, notes })
export const insertNote = note => ({ type: INSERT_NOTE, note })
export const removeNote = noteId => ({ type: REMOVE_NOTE, noteId })
export const updateNote = note => ({ type: UPDATE_NOTE, note })

export const fetchNotes = whiteboardId =>
  dispatch =>
    axios.get(`/api/whiteboards/${whiteboardId}`)
      .then(whiteboard => whiteboard.data)
      .then(notes => dispatch(getNotes(notes)))
      .catch(err => console.log(err))

export const addNote = (note) =>
  dispatch =>
    axios.post(`/api/notes`, { note })
      .then(createdNote => createdNote.data)
      .then(newNote => {
        dispatch(insertNote(newNote))
        socket.emit('new-note', newNote)
      })
      .catch(err => console.log(err))


export const deleteNote = (noteId, whiteboardId) =>
  dispatch =>
    axios.delete(`/api/notes/${noteId}`)
      .then(_ => {
        dispatch(removeNote(noteId))
        dispatch(removeBranch(noteId, whiteboardId))
        socket.emit('delete-note', noteId, whiteboardId)
        socket.emit('remove branch', noteId, whiteboardId)
      })
      .catch(err => console.log(err))

export const editNote = (id, data, branches) =>
  dispatch =>
    axios.put(`/api/notes/${id}`, data)
      .then(updatedNote => {
        dispatch(updateNote(updatedNote.data))
        socket.emit('edit-note', updatedNote.data)
        if (branches) dispatch(fetchBranches(updatedNote.data.whiteboardId))
      })
      .catch(err => console.log(err))

export const castVote = noteId => dispatch => {
    return axios.put(`/api/notes/vote/${noteId}`)
    .then(updatedNote => updatedNote.data)
    .then(updatedNote => {
      dispatch(updateNote(updatedNote))
      socket.emit('edit-note', updatedNote)
    })
    .catch(err => console.log(err))
  }

export default function (state = defaultNotes, action) {
  switch (action.type) {
    case GET_NOTES:
      return action.notes
    case INSERT_NOTE:
      return state.concat(action.note)
    case REMOVE_NOTE:
      return state.filter(note => note.id !== action.noteId)
    case UPDATE_NOTE:
      return state.filter(note => note.id !== action.note.id).concat(action.note)
    default:
      return state
  }
}
