const Sequelize = require('sequelize')
const db = require('../db')
const sendmail = require('sendmail')();


const Attendees = db.define('attendees', {
  attended: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

Attendees.afterBulkCreate(users => {

    users.forEach(id => {
      User.findById({id})
      .then(userData => {
        sendmail({
          from: 'IdeaStorm@stormain.com',
          to: `${userData.data.email}`,
          subject: 'test sendmail',
          html: 'Mail of test sendmail ',
        }, function(err, reply) {
          console.log(err && err.stack);
          console.dir(reply);
      });
      })
    })

  })
  module.exports = Attendees
