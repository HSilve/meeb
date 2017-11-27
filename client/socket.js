import io from 'socket.io-client'
import store, { postMessage, insertNote, updateNote, removeNote, createRoom, updateRoom, enterCollaborator, destroyRoom, deleteRoom} from './store';

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('disconnect', () =>
  console.log('server did disconnect.')
)
socket.on('new-room', room => {
  console.log('a new room has been created.', room)
  store.dispatch(createRoom(room))
  console.log('New room has been posted')

})
socket.on('delete-room', roomId => {
  console.log(roomId, 'has been deleted')
  store.dispatch(deleteRoom(roomId))
  console.log('room has been deleted')

})

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
socket.on('edit-note', (note) => {
  console.log('A note has been edited', note)
  store.dispatch(updateNote(note));
  console.log('Edits have been reflected')
})
socket.on('delete-note', id =>  {
  console.log('A note has been deleted');
  store.dispatch(removeNote(id));
  console.log('Note Removed');
})

socket.on('enter-room', (user) => {
  console.log(user.name, 'joining room');
  store.dispatch(enterCollaborator(user));
})
socket.on('end-session', (whiteboard) => {
  console.log('The host has closed room', whiteboard.id)
  store.dispatch(destroyRoom(whiteboard));
});
socket.on('edit-room', (whiteboard) => {
  console.log('An edit has been made to room', whiteboard.id);
  store.dispatch(updateRoom(whiteboard))
})

socket.on('leave-room', (userId, roomId) => {
  console.log(userId, 'leaving', roomId);


})

export default socket
