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

})
socket.on('delete-room', roomId => {
  store.dispatch(deleteRoom(roomId))
})

socket.on('new-message', message => {
  store.dispatch(postMessage(message));
});
socket.on('new-note', note => {
  store.dispatch(insertNote(note));
})
socket.on('edit-note', (note) => {
  store.dispatch(updateNote(note));
})
socket.on('delete-note', id =>  {
  store.dispatch(removeNote(id));
})

socket.on('enter-room', (user) => {
  store.dispatch(enterCollaborator(user));
})
socket.on('end-session', (whiteboard) => {
  store.dispatch(destroyRoom(whiteboard));
});
socket.on('edit-room', (whiteboard) => {
  store.dispatch(updateRoom(whiteboard))
})

socket.on('leave-room', (userId, roomId) => {
  console.log(userId, 'leaving', roomId);
})

export default socket
