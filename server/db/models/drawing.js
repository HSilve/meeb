const Sequelize = require('sequelize')
const db = require('../db')
const Stroke = require('./stroke')

const Drawing = db.define('drawing', {

}, {
  defaultScope: {
    include: [{model: Stroke}]
  }
})

module.exports = Drawing
