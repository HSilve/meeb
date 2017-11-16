const Sequelize = require('sequelize')
const db = require('../db')

const Stroke = db.define('stroke', {
  start: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: false
  },
  end: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: false
  },
  color: {
    type: Sequelize.STRING
  }
})
module.exports = Stroke
