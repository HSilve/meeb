
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
      socket.on('new-room', (whiteboard) => {
        socket.broadcast.emit('new-room', whiteboard)

      })
      socket.on('delete-room', (whiteboardId) => {
        socket.broadcast.emit('delete-room', whiteboardId)

      })
      socket.on('enter-room', (user, whiteboardId) => {
        socket.join(whiteboardId)
        socket.broadcast.to(whiteboardId).emit('enter-room', user)
      })

      socket.on('leave-room', (userId, whiteboardId) => {
        socket.leave(whiteboardId)
      })

      socket.on('edit-room', (whiteboard) => {
        socket.broadcast.to(whiteboard.id).emit('edit-room', whiteboard)
      })

    socket.on('new-message', (message) => {
      socket.broadcast.to(message.whiteboardId).emit('new-message', message);
    })

    socket.on('new-note', note => {
      socket.broadcast.to(note.whiteboardId).emit('new-note', note);
    })
    socket.on('edit-note', note => {
      socket.broadcast.to(note.whiteboardId).emit('edit-note', note);
    })
    socket.on('delete-note', (noteId, whiteboardId) =>  {
      socket.broadcast.to(whiteboardId).emit('delete-note', noteId);
    })
    socket.on('end-session', (whiteboard => {
      socket.broadcast.to(whiteboard.id).emit('end-session', whiteboard)
    }))
    socket.on('disconnect', () => {
      // sockets.delete(socket.id)
    })

  })
}
