const router = require('express').Router()
const { Whiteboard, User, Note, Attendees } = require('../db/models')
const sendmail = require('sendmail')();

module.exports = router

router.get('/', (req, res, next) => {
  Whiteboard.findAll()
    .then(whiteboards => res.json(whiteboards))
    .catch(next)
})
router.get('/myRooms/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      return user.getWhiteboards({ include: [{ all: true, nested: true }] })
    })
    .then(whiteboards => {
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
  Whiteboard.update(req.body, {
    where: {id: req.params.whiteboardId},
    returning: true,
    plain: true
  })
  .then(board => res.json(board))
  .catch(next)
})

router.post('/', (req, res, next) => {
  Whiteboard.create({
    name: req.body.name,
    host: req.body.host,
    userId: req.body.userId,
    startTime: req.body.startTime,
    date: req.body.date
  })
    .then(room => {
      req.body.attendees.forEach(attendee => {
        room.addUser(attendee.id)
      })
      room.addUser(req.body.userId)
      return room;
    })
    .then(board => res.json(board))
    .catch(next)
})

router.delete('/:whiteboardId', (req, res, next) => {
  const id = req.params.whiteboardId;
  Whiteboard.findById(id,
    {
    include: [{all: true}]
  })
  .then(group => {
    group.users.forEach(data => {
      sendmail({
        from: 'IdeaStorm@stormail.com',
        to: data.dataValues.email,
        subject: 'A brainStorm has been canceled',
        html: group.dataValues.host + ' no longer requires your collaboration on ' + group.dataValues.name + ' which was previously scheduled for: ' + group.dataValues.date + ' at: ' + group.dataValues.startTime + '.',
      }, function(err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    });
    })
  })
  .then(_ => {
    Note.destroy({
      where: {whiteboardId: id}
    })
  })
  .then(_ => {
      return Whiteboard.destroy({
          where: {id}
        })
  })
  .then(row => res.json(row))
  .catch(next)
})
