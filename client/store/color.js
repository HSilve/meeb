const UPDATE_NOTE_ARRAY = 'UPDATE_NOTE_ARRAY';
const GET_NOTE_ARRAY = 'GET_NOTE_ARRAY';
const CLEAR_NOTE_ARRAY = 'CLEAR_NOTE_ARRAY';

export function updateNoteArray(arr) {
  const action = { type: UPDATE_NOTE_ARRAY, arr }
  return action
}
export const clearNoteArray = () => ({type: CLEAR_NOTE_ARRAY});
export const getNoteArray = () => ({type: GET_NOTE_ARRAY})

export default function reducer(state = [], action) {
  switch (action.type) {
    case UPDATE_NOTE_ARRAY:
      return [...state, action.arr]
    case CLEAR_NOTE_ARRAY:
      return [];
    case GET_NOTE_ARRAY:
    default:
      return state;
  }
}
