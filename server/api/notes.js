const router = require('express').Router()
const { Note } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Note.findAll()
    .then(notes => res.json(notes))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => res.json(note))
    .catch(next);
})

router.post('/', (req, res, next) => {
  Note.create(req.body)
    .then(note => res.json(note))
    .catch(next);
})

router.put('/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => res.json(note.update(req.body)))
    .catch(next);
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Note.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
})
