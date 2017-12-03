
//whiteboards available:
module.exports = (io) => {
  io.on('connection', (socket) => {
    // sockets.set(socket.id, socket)

    console.log(`A socket connection to the server has been made: ${socket.id}`)
      socket.on('new-room', (whiteboard) => {
        console.log('a new room has been created.')
        socket.broadcast.emit('new-room', whiteboard)
        console.log('broadcast done')

      })
      socket.on('delete-room', (whiteboardId) => {
        console.log('a room has been deleted.')
        socket.broadcast.emit('delete-room', whiteboardId)
        console.log('broadcast done')

      })
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

      socket.on('edit-room', (whiteboard) => {
        console.log('Change to room', whiteboard.name);
        socket.broadcast.to(whiteboard.id).emit('edit-room', whiteboard)
      })

    socket.on('new-message', (message) => {
      console.log('room', message.whiteboardId, 'has a new-message', message)
      socket.broadcast.to(message.whiteboardId).emit('new-message', message);
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
    socket.on('end-session', (whiteboard => {
      socket.broadcast.to(whiteboard.id).emit('end-session', whiteboard)
    }))
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('add branch', branch => {
      socket.broadcast.to(branch.whiteboardId).emit('add branch', branch)
      console.log(branch.whiteboardId)
    })

    socket.on('get branches', (branches, whiteboardId) => {
      console.log(branches)
      socket.broadcast.to(whiteboardId).emit('get branches', branches)
      console.log(whiteboardId)
    })

    socket.on('remove branch', (noteId, whiteboardId) => {
      socket.broadcast.to(whiteboardId).emit('remove branch', noteId)
    })

  })
}
