const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/notes', require('./notes'))
router.use('/whiteboards', require('./whiteboards'))
router.use('/message', require('./message'))
router.use('/attendees', require('./attendees'))
router.use('/branches', require('./branches'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
