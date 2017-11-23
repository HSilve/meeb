const User = require('./user');
const Drawing = require('./drawing');
const Stroke = require('./stroke');
const Whiteboard = require('./whiteboard');
const Note = require('./note')
const Message = require('./message')
const Attendees = require('./attendees')


/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Drawing.hasMany(Stroke);
Drawing.belongsTo(User);
Note.belongsTo(User);
Whiteboard.belongsToMany(User, { through: Attendees });
User.belongsToMany(Whiteboard, { through: Attendees });
Whiteboard.belongsTo(User);
Whiteboard.hasMany(Note);
Whiteboard.hasMany(Drawing);
Message.belongsTo(User);
Message.belongsTo(Whiteboard);
Note.belongsToMany(Note, {as: 'noteParent', through: 'NoteParent'})


/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, Drawing, Stroke, Whiteboard, Note, Message, Attendees
}
