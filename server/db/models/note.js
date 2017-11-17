const Sequelize = require('sequelize')
const db = require('../db')

const Note = db.define('note', {
  image: {
    type: Sequelize.STRING,
    allowNull: true
  },
  link: {
    type: Sequelize.STRING,
    validate: { isURL: true },
    allowNull: true
  },
  text: {
    type: Sequelize.STRING,
    allowNull: true
  },
  position: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: [100, 100]
  },
  highlighted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }


})

module.exports = Note
