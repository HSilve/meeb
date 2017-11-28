// const SELECT_NOTE = "SELECT_NOTE"
// const UNSELECT_NOTE = "UNSELECT_NOTE"
// const GET_SELECTED = "GET_SELECTED"

// export function getSelected() {
//   const action = { type: GET_SELECTED }
//   return action;
// }

// export function getSelectNote(id) {
//   const action = { type: SELECT_NOTE, id }
//   return action;
// }

// export function unselectNote(id) {
//   const action = { type: UNSELECT_NOTE, id }
//   return action;
// }

// export const selected = () => dispatch => {
//   dispatch(getSelected())
// }

// export const selectNote = id => dispatch => {
//   dispatch(getSelectNote(id));
// }

// export const unselect = id => dispatch => {
//   dispatch(unselectNote(id));
// }

// export default function reducer(state = {}, action) {
//   switch (action.type) {
//     case SELECT_NOTE:
//       return Object.assign({}, state, action.id)

//     case UNSELECT_NOTE:
//       delete state[action.id]
//       return state

//     case GET_SELECTED:
//     default:
//       return state;
//   }
// }

const UPDATE_NOTE_ARRAY = 'UPDATE_NOTE_ARRAY'

export function updateNoteArray(arr) {
  const action = { type: UPDATE_NOTE_ARRAY, arr }
  return action
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case UPDATE_NOTE_ARRAY:
      return action.arr

    default:
      return state;
  }
}
