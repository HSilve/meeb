const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.delete('/:id', (req, res, next) => {
	// admin and user themselves
	if (req.user.isAdmin || req.user.id === req.params.id) next()


  // User.findAll({
  //   // explicitly select only the id and email fields - even though
  //   // users' passwords are encrypted, it won't help if we just
  //   // send everything to anyone who asks!
  //   attributes: ['id', 'email']
  // })
  //   .then(users => res.json(users))
  //   .catch(next)
},  (req, res, next) => {

})





