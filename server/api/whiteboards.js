const router = require('express').Router()
const { Whiteboard, User, Note, Attendees } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Whiteboard.findAll(
    // { include: [{ all: true, nested: true }] }
  )
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
  Attendees.findAll({where: {whiteboardId: id}})
  // .then(group => {
  //   group.forEach(pair => {
  //     console.log("this is just 1 pair", pair.dataValues)
  //     let person = User.findById(pair.dataValues.userId);
  //     person.sendDeleteEmail("Me", "Myboard", '2017-11-27', '04:30');
  //   })
  //   // board.dataValues
  // })
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
