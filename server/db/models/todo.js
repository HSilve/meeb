const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')

const Todo = db.define('todo', {
  task: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
}, {
  defaultScope: {
    include: [User]
  }
})

module.exports = Todo
