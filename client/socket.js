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
  store.dispatch(createRoom(room))
  console.log('New room has been posted')

})
socket.on('delete-room', roomId => {
  store.dispatch(deleteRoom(roomId))
  console.log('room has been deleted')

})

socket.on('new-message', message => {
  store.dispatch(postMessage(message));
  console.log('after dispatch')
});
socket.on('new-note', note => {
  store.dispatch(insertNote(note));
  console.log('new note has been posted');
})
socket.on('edit-note', (note) => {
  store.dispatch(updateNote(note));
  console.log('Edits have been reflected')
})
socket.on('delete-note', id =>  {
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
