const router = require('express').Router()
const { Branch } = require('../db/models')
module.exports = router

router.get(`/:whiteboardId`, (req, res, next) => {
  Branch.findAll({ where: { whiteboardId: req.params.whiteboardId }})
    .then(branches => res.json(branches))
    .catch(next)
})

router.post(`/`, (req, res, next) => {
  Branch.create(req.body)
    .then(branch => res.json(branch))
    .catch(next)
})
