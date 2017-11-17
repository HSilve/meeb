const router = require('express').Router()
const { Message } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Message.findAll()
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Message.findById(req.params.id)
    .then(message => res.json(message))
    .catch(next);
})

router.post('/', (req, res, next) => {
  Message.create(req.body)
    .then(message => res.json(message))
    .catch(next);
})

router.put('/:id', (req, res, next) => {
  Message.findById(req.params.id)
    .then(message => res.json(message.update(req.body)))
    .catch(next);
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Message.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
})
