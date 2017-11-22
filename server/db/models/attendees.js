const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')
const sendmail = require('sendmail')();


const Attendees = db.define('attendees', {
  attended: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

Attendees.afterBulkCreate(group => {
    group.forEach(pair => {
      User.findById(pair.userId)
      .then(userData => {
        sendmail({
          from: 'IdeaStorm@stormail.com',
          to: userData.dataValues.email,
          subject: 'An Invite',
          html: "you've been invited to collaboarate on a new board.",
        }, function(err, reply) {
          console.log(err && err.stack);
          console.dir(reply);
      });
      })
    })

  })
  module.exports = Attendees
