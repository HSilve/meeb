const router = require('express').Router()
const { Message } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Message.findAll({ include: [{ all: true}], order: [['createdAt', 'ASC']] })
    .then(users => res.json(users))
    .catch(next)
})
// Not being used at this time
router.get('/:id', (req, res, next) => {
  Message.findById(req.params.id, { include: [{ all: true }] })
    .then(message => res.json(message))
    .catch(next);
})

router.post('/', (req, res, next) => {
  console.log('Post Req.Body', req.body)
  Message.create(req.body)
    .then(message => {
      Message.findById(message.id, {include: [{all: true}]})
      .then(foundMessage => res.json(foundMessage))
    })
    .catch(next);
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Message.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
})
