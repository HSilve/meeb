const Sequelize = require('sequelize')
const db = require('../db')

const Branch = db.define('branch', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
})

module.exports = Branch
