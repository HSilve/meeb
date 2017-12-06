const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll(
    {attributes: ['id', 'email', 'name', 'userName', 'image']}
  )
    .then(users => res.json(users))
    .catch(next)
})
router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(users => res.json(users))
    .catch(next)
})
router.put('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
  .then(user => res.json(user.update(req.body)))
  .catch(next)
})

router.post('/', (req, res, next) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    image: req.body.image

  })
  .then(user => res.json(user))
  .catch(next)
})

router.delete('/:userId', (req, res, next) => {
  User.destroy({
    where: {id: req.params.userId}
  })
  .then(row => res.json(row))
  .catch(next)
})
