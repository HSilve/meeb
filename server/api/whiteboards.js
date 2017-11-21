const router = require('express').Router()
const { Whiteboard, Message, User, Attendees } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Whiteboard.findAll({ include: [{ all: true, nested: true }] })
    .then(whiteboards => res.json(whiteboards))
    .catch(next)
})
router.get('/myRooms/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      //get all where the user is an attendee
      return user.getWhiteboards({ include: [{ all: true, nested: true }] })
    })
    .then(whiteboards => {
      console.log("WHITEBOARDS--", whiteboards)
      res.json(whiteboards)
    })

    .catch(next)
})
router.get('/:whiteboardId', (req, res, next) => {
  Whiteboard.findById(req.params.whiteboardId, {
    include: [{ all: true, nested: true }]
  })
    .then(whiteboards => res.json(whiteboards))
    .catch(next)
})
router.put('/:whiteboardId', (req, res, next) => {
  Whiteboard.findById(req.params.whiteboardId)
    .then(board => res.json(board.update(req.body)))
    .catch(next)
})

// router.post('/', (req, res, next) => {
//   let createdWhiteboard = null;
//   Promise.all([
//     User.findById(req.body.userId),
//     Whiteboard.create({
//       host: req.body.host,
//       userId: req.body.userId
//     })])
//     .then(result => {
//       const user = result[0]
//       createdWhiteboard = result[1]
//       return createdWhiteboard.addUser(user)
//     })
//     .then(response => Whiteboard.findById(createdWhiteboard.id, { include: [{ all: true, nested: true }] }))
//     .then(found => res.json(found))
//     .catch(next)
// })

router.post('/', (req, res, next) => {
  Whiteboard.create({
    name: req.body.name,
    host: req.body.host,
    userId: req.body.userId
  })
    .then(room => {
      req.body.attendees.forEach(attendee => {
        room.addUser(attendee.id)
      })
      room.addUser(req.body.userId);
      return room;
    })
    .then(board => {
      res.json(board)
    })
    .catch(next)
})

router.delete('/:whiteboardId', (req, res, next) => {
  Whiteboard.destroy({
    where: { id: req.params.whiteboardId }
  })
    .then(row => res.json(row))
    .catch(next)
})
