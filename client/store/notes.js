import axios from 'axios'

const GET_NOTES = 'GET_NOTES'
const defaultNotes = []

const getNotes = notes => ({ type: GET_NOTES, notes })

// takes in whiteboardId and returns all notes in the selected whiteboard
export const fetchNotes = whiteboardId =>
  dispatch =>
    axios.get(`/api/whiteboards/${whiteboardId}`)
      .then(whiteboard => {
        console.log(whiteboard)
        dispatch(getNotes(whiteboard.data.notes))
      })
      .catch(err => console.log(err))

export const addNote = (note) =>
  dispatch => {
    console.log(note)
    axios.post(`/api/notes`, { note })
      .then(_ => dispatch(fetchNotes(note.whiteboardId)))
      .catch(err => console.log(err))
  }

export const deleteNote = note =>
  dispatch =>
    axios.delete(`/api/notes/${note.id}`)
      .then(_ => dispatch(fetchNotes(note.whiteboardId)))
      .catch(err => console.log(err))

export default function (state = defaultNotes, action) {
  switch (action.type) {
    case GET_NOTES:
      return action.notes
    default:
      return state
  }
}
