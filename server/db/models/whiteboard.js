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
    type: Sequelize.STRING,
    allowNull: false
  },
  endTime: {
    type: Sequelize.STRING,
    allowNull: true
  },
  closed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  voteable: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  swimlane: {
    type: Sequelize.INTEGER
  },
  categories: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }

})

module.exports = Whiteboard
