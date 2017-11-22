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
  console.log("Im creating this thinbg")
    group.forEach(pair => {
      User.findById(pair.userId)
      .then(userData => {
        sendmail({
          from: 'IdeaStorm@stormail.com',
          to: userData.dataValues.email,
          // to: 'henryb735@gmail.com',
          subject: 'test sendmail',
          html: 'Mail of test sendmail',
        }, function(err, reply) {
          console.log(err && err.stack);
          console.dir(reply);
      });
      })
    })

  })
  module.exports = Attendees
