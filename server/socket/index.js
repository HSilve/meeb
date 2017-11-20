const Message = require('../db/models/message')

//
// let sockets = new Map()
// function broadcast(fromSocket, ...msg) {
//   console.log('broadcast from', fromSocket.id)
//   for (let sock of sockets.values()) {
//     console.log('  ...to', sock.id, '?')
//     if (sock.id !== fromSocket.id) {
//       console.log('   -> sending', msg)
//       sock.emit(...msg)
//     }
//   }
// }

module.exports = (io) => {
  io.on('connection', (socket) => {
    // sockets.set(socket.id, socket)

    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('new-message', message => {
      console.log('new-message', message)
      socket.broadcast.emit('new-message', message);
      // broadcast(socket, 'new-message', message)
      console.log('broadcast done')
    })

    socket.on('new-note', note => {
      console.log('new-note', note)
      socket.broadcast.emit('new-note', note);
      console.log('broadcast done')

    })
    socket.on('edit-note', (id, data) => {
      console.log('edit-note', data)
      socket.broadcast.emit('edit-note', id, data);
      console.log('broadcast done')


    })
    socket.on('delete-note', id =>  {
      console.log('delete-note')
      socket.broadcast.emit('delete-note', id);
      console.log('broadcast done')


    })

    socket.on('disconnect', () => {
      // sockets.delete(socket.id)
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
