import axios from 'axios'
import socket from '../socket';
import { addNoteToBoard } from './whiteboard'

const GET_NOTES = 'GET_NOTES'
const INSERT_NOTE = 'ADD_NOTE'
const REMOVE_NOTE = 'REMOVE_NOTE'
const UPDATE_NOTE = 'UPDATE_NOTE'
const defaultNotes = []

export const getNotes = notes => ({ type: GET_NOTES, notes })
export const insertNote = note => ({ type: INSERT_NOTE, note })
export const removeNote = noteId => ({ type: REMOVE_NOTE, noteId })
export const updateNote = note => ({ type: UPDATE_NOTE, note })

// takes in whiteboardId and returns all notes in the selected whiteboard
export const fetchNotes = whiteboardId =>
  dispatch =>
    axios.get(`/api/whiteboards/${whiteboardId}`)
      .then(whiteboard => {
        dispatch(getNotes(whiteboard.data.notes))
      })
      .catch(err => console.log(err))

export const addNote = (note) =>
  dispatch => {
    axios.post(`/api/notes`, { note })
      .then(createdNote => {
        dispatch(insertNote(createdNote.data))
        socket.emit('new-note', createdNote.data)
      })
      .catch(err => console.log(err))
    }

export const deleteNote = (noteId, whiteboardId) =>
  dispatch =>
    axios.delete(`/api/notes/${noteId}`)
      .then(_ => {
        dispatch(removeNote(noteId))
        socket.emit('delete-note', noteId, whiteboardId)
      })
      .catch(err => console.log(err))

export const editNote = (id, data) =>
  dispatch =>
    axios.put(`/api/notes/${id}`, data)
      .then(updatedNote => {
        dispatch(updateNote(updatedNote.data))
        socket.emit('edit-note', updatedNote.data)
      })
      .catch(err => console.log(err))

export const castVote = noteId => dispatch =>
    axios.put(`api/notes/vote/${noteId}`)
    .then(updatedNote => {
      dispatch(updateNote(updatedNote.data))
      socket.emit('edit-note', updatedNote.data)
    })
    .catch(err => console.log(err))

export default function (state = defaultNotes, action) {
  switch (action.type) {
    case GET_NOTES:
      console.log(action.notes)
      return action.notes
    case INSERT_NOTE:
      return state.concat(action.note)
    case REMOVE_NOTE:
      return state.filter(note => note.id != action.noteId)
    case UPDATE_NOTE:
      return state.filter(note => note.id !== action.note.id).concat(action.note)
    default:
      return state
  }
}
