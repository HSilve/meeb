const router = require('express').Router()
const { Whiteboard, Message, User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Whiteboard.findAll({ include: [{ all: true, nested: true }] })
    .then(whiteboards => res.json(whiteboards))
    .catch(next)
})
router.get('/myRooms/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      return user.getWhiteboards()
    })
    .then(whiteboards => res.json(whiteboards))
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

router.post('/', (req, res, next) => {
  let createdWhiteboard = null;
  Promise.all([
    User.findById(req.body.userId),
    Whiteboard.create({
      host: req.body.host,
      userId: req.body.userId
    }
    )])
    .then(result => {
      const user = result[0]
      createdWhiteboard = result[1]
      return createdWhiteboard.addUser(user)
    })
    .then(response => res.json(createdWhiteboard))
    .catch(next)
})

router.delete('/:whiteboardId', (req, res, next) => {
  Whiteboard.destroy({
    where: { id: req.params.whiteboardId }
  })
    .then(row => res.json(row))
    .catch(next)
})
