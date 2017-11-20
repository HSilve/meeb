import io from 'socket.io-client'
import store, { postMessage, insertNote, updateNote, removeNote } from './store';

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('disconnect', () =>
  console.log('server did disconnect.')
)

socket.on('new-message', message => {
  console.log('front end new message')
  store.dispatch(postMessage(message));
  console.log('after dispatch')
});
socket.on('new-note', note => {
  console.log('A new note has bee posted', note)
  store.dispatch(insertNote(note));
  console.log('new note has been posted');
})
socket.on('edit-note', (id, data) => {
  console.log('A note has been edited', data)
  store.dispatch(updateNote(id, data));
  console.log('Edits have been reflected')
})
socket.on('delete-note', id =>  {
  console.log('A note has been deleted')
  store.dispatch(removeNote(id))
  console.log('Note Removed')
})

export default socket
