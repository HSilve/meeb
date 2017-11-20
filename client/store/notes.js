import axios from 'axios'
import { updateNoteInBoard } from './whiteboard'

const GET_NOTES = 'GET_NOTES'
const INSERT_NOTE = 'ADD_NOTE'
const REMOVE_NOTE = 'REMOVE_NOTE'
const UPDATE_NOTE = 'UPDATE_NOTE'
const defaultNotes = []

const getNotes = notes => ({ type: GET_NOTES, notes })
const insertNote = note => ({ type: INSERT_NOTE, note })
const removeNote = noteId => ({ type: REMOVE_NOTE, noteId })
const updateNote = note => ({ type: UPDATE_NOTE, note })

// takes in whiteboardId and returns all notes in the selected whiteboard
export const fetchNotes = whiteboardId =>
  dispatch =>
    axios.get(`/api/whiteboards/${whiteboardId}`)
      .then(whiteboard => {
        dispatch(getNotes(whiteboard.data))
      })
      .catch(err => console.log(err))

export const addNote = (note) =>
  dispatch => {
    axios.post(`/api/notes`, { note })
      .then(createdNote => {
        dispatch(updateNoteInBoard(createdNote.data))
        dispatch(insertNote(createdNote.data))
      })
      .catch(err => console.log(err))
    }

export const deleteNote = note =>
  dispatch =>
    axios.delete(`/api/notes/${note.id}`)
      .then(_ => dispatch(removeNote(note.id)))
      .catch(err => console.log(err))

export const editNote = (id, data) =>
  dispatch =>
    axios.put(`/api/notes/${id}`, data)
      .then(updatedNote => dispatch(updateNote(updatedNote)))
      .catch(err => console.log(err))

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
