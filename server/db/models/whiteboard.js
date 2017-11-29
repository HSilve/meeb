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
  }

})

// Whiteboard.beforeBulkDestroy(({where, individualHooks}) => {
//   console.log("I am trying to delete this board. Here it is", where.id, "and this", individualHooks)

//   let host, boardName, boardDate, boardTime;
//   const boardId  = where.id;
//   Whiteboard.findById(boardId, {include: [{all: true, nested: true}]})
//   .then(board => {
//     console.log("this is the board", board.dataValues)
//     let meeting = board.dataValues;
//     host = meeting.host;
//     boardName = meeting.name;
//     boardDate = meeting.date;
//     boardTime = meeting.startTime;
//   })
//   // .then(_ => Attendees.findAll({where: {whiteboardId: boardId}}))
//   // .then(pairs => {
//   //   console.log("this is the attendees data", pairs)
//   // })
//   // .then(_ => {
//   //       // group.forEach(pair => {
//   //       //   User.findById(pair.userId)
//   //       //   .then(userData => {
//   //       //     sendmail({
//   //       //       from: 'IdeaStorm@stormail.com',
//   //       //       to: userData.dataValues.email,
//   //       //       subject: 'An invite to brainstorm',
//   //       //       html: host + ' has invited you to collaborate on ' + boardName + ' on: ' + boardDate + ' at: ' + boardTime + ".",
//   //       //     }, function(err, reply) {
//   //       //       console.log(err && err.stack);
//   //       //       console.dir(reply);
//   //       //   });
//   //       //   })
//   //       // })
//   // })
//   .catch(err => {console.log(err)})


// })


module.exports = Whiteboard
