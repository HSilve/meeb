const Sequelize = require('sequelize')
const db = require('../db')

const Whiteboard = db.define('whiteboard', {
  host: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATEONLY
  }
})

module.exports = Whiteboard
