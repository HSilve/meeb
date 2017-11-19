import io from 'socket.io-client'
import store, { getMessage, getChannel } from './store';

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')

  socket.on('new-message', message => {
    store.dispatch(getMessage(message));
  });

  socket.on('new-channel', channel => {
    store.dispatch(getChannel(channel));
  });
})

export default socket
