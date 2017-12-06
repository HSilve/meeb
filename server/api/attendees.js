const router = require('express').Router()
const { Attendees, User, Whiteboard } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Attendees.findAll()
    .then(attendees => res.json(attendees))
    .catch(next)
})

router.get('/:whiteboardId', (req, res, next) => {
  User.findAll({
    include: [{model: Whiteboard, through: Attendees,
      where: {id: req.params.whiteboardId}
    }]
  })
    .then(users => res.json(users))
    .catch(next)
})


//take a user's attendance
router.put('/:whiteboardId', (req, res, next) => {
  Attendees.update({attended: true}, {
    where: {userId: req.body.userId, whiteboardId: req.params.whiteboardId},
    returning: true,
    plain: true
    })
  .then(data => {
    const id = data[1].userId;
    return User.findById(id, {
      include: [{model: Whiteboard, through: Attendees,
        where: {id: req.params.whiteboardId}
      }]
    })
  })
  .then(user => res.json(user))
  .catch(next)
})
