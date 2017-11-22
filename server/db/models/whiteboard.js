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
  },
  startTime: {
    type: Sequelize.TIME,
    allowNull: false
  },
  endTime: {
    type: Sequelize.TIME,
    allowNull: true
  }

})

module.exports = Whiteboard
