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
//whiteboards available:
module.exports = (io) => {
  io.on('connection', (socket) => {
    // sockets.set(socket.id, socket)

    console.log(`A socket connection to the server has been made: ${socket.id}`)
     //Entering A room
      socket.on('enter-room', (user, whiteboardId) => {
        console.log(user.name, 'joining room', whiteboardId);
        socket.join(whiteboardId)
        socket.broadcast.to(whiteboardId).emit('enter-room', user)
        console.log('broadcast done')
      })

      socket.on('leave-room', (userId, whiteboardId) => {
        console.log(userId, 'leaving room', whiteboardId);
        socket.leave(whiteboardId)
      })

    socket.on('new-message', (message) => {
      console.log('room', message.whiteboardId,'has a new-message', message)
      socket.broadcast.to(message.whiteboardId).emit('new-message', message);
      // broadcast(socket, 'new-message', message)
      console.log('broadcast done')
    })

    socket.on('new-note', note => {
      console.log('new-note', note)
      socket.broadcast.to(note.whiteboardId).emit('new-note', note);
      console.log('broadcast done')
    })
    socket.on('edit-note', note => {
      console.log('edit-note', note)
      socket.broadcast.to(note.whiteboardId).emit('edit-note', note);
      console.log('broadcast done')
    })
    socket.on('delete-note', (noteId, whiteboardId) =>  {
      console.log('delete-note')
      socket.broadcast.to(whiteboardId).emit('delete-note', noteId);
      console.log('broadcast done')
    })

    socket.on('disconnect', () => {
      // sockets.delete(socket.id)
      console.log(`Connection ${socket.id} has left the building`)
    })

    // ///Creating A Room
    // socket.on('new-room', room => {
    //   console.log('Entering Room');
    //   socket.broadcast.emit('new-room', room);
    //   console.log('broadcast done')
    // })
    // socket.on('edit-room', (id, data) => {
    //   console.log('Editing Room');
    //   socket.boradcast.emit('eidt-room', id, data);
    //   console.log('broadcast done')
    // })
  })
}


//need to broadcast :
//when someone enters a room
//when someone sends a chat to a specific room
//notes to a specific room
