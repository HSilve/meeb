const Sequelize = require('sequelize')
const db = require('../db')


const Attendees = db.define('attendees', {
  attended: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Attendees
