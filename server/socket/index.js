const Message = require('../db/models/message')

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('new-message', message => {
      console.log('new-message', message)
      socket.broadcast.emit('new-message', message);
      console.log('broadcast done')
    })
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
