const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')
const Whiteboard = require('./Whiteboard')
const sendmail = require('sendmail')();


const Attendees = db.define('attendees', {
  attended: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
})

Attendees.prototype.sendDeleteEmail = function (host, boardName, boardDate, boardTime) {
  console.log("I'm hre sending an email")
  sendmail({
    from: 'IdeaStorm@stormail.com',
    to: this.email,
    subject: 'A brainStorm has been canceled',
    html: host + ' no longer requires your collaboration on ' + boardName + ' which was previously scheduled for: ' + boardDate + ' at: ' + boardTime + ".",
  }, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
});
}

Attendees.afterBulkCreate(group => {
  let host, boardName, boardDate, boardTime;
    Whiteboard.findById(group[0].whiteboardId)
    .then(board => {
      let meeting = board.dataValues;
      host = meeting.host;
      boardName = meeting.name;
      boardDate = meeting.date;
      boardTime = meeting.startTime;
    })
    .then(_ => {
          group.forEach(pair => {
            User.findById(pair.userId)
            .then(userData => {
              sendmail({
                from: 'IdeaStorm@stormail.com',
                to: userData.dataValues.email,
                subject: 'An invite to brainstorm',
                html: host + ' has invited you to collaborate on ' + boardName + ' on: ' + boardDate + ' at: ' + boardTime + ".",
              }, function(err, reply) {
                console.log(err && err.stack);
                console.dir(reply);
            });
            })
          })
    })
  })

  module.exports = Attendees
