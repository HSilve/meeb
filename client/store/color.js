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
