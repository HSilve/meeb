const router = require('express').Router()
const { Whiteboard, Message } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Whiteboard.findAll({ include: [{ all: true, nested: true }] })
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
  Whiteboard.create({
    host: req.body.host,
    userId: req.body.userId
  })
    .then(whiteboard => res.json(whiteboard))
    .catch(next)
})
router.post('/:whiteboardId/message', (req, res, next) => {

  Message.create({
    text: req.body.text,
    userId: req.body.userId,
    whiteboardId: req.params.whiteboardId
  })
    .then(message => res.json(message))
    .catch(next)
})

router.delete('/:whiteboardId', (req, res, next) => {
  Whiteboard.destroy({
    where: { id: req.params.whiteboardId }
  })
    .then(row => res.json(row))
    .catch(next)
})
