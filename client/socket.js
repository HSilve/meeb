import io from 'socket.io-client'
import store, { postMessage } from './store';

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('disconnect', () =>
  console.log('server did disconnect.')
)

socket.on('new-message', message => {
  console.log('front end new message', message)
  store.dispatch(postMessage(message));
  console.log('after dispatch')
});

export default socket
