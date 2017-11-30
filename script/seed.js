/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const { User, Message, Note, Whiteboard, Attendees } = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  await Promise.all([
    User.create({ email: 'cody@email.com', password: '123', name: 'Cody D. Dog' })
      .then(_ =>
        User.create({ email: 'murphy@email.com', password: '123', name: 'Murphy A. Law' })
      )
      .then(_ =>
        User.create({ email: 'Blanca@email.com', password: '456', name: 'Blanca Sanchez' })
      )
      .then(_ =>
        User.create({ email: 'Maria@email.com', password: '456', name: 'Maria Betances' })
      )
      .then(_ =>
        User.create({ email: 'Erica@email.com', password: '456', name: 'Erica Chai' })
      )
      .then(_ =>
        User.create({ email: 'Evlis@email.com', password: '456', name: 'Evlis Henry' })
      )
      .then(_ =>
        User.create({ email: 'Demo1@email.com', password: '456', name: 'User A Demo' })
      )
      .then(_ =>
        User.create({ email: 'Demo2@email.com', password: '456', name: 'User B Demo' })
      )

  ])
  await Promise.all([
    Whiteboard.create({ name: 'Corporate Holiday Gifts', host: 'Maria', userId: 4, startTime: '04:30', date: '2017-10-27' })
      .then(_ =>
        Whiteboard.create({ name: 'Company Goals For 2018', host: 'Maria', userId: 4, startTime: '04:30', date: '2018-01-01' })
      )
      .then(_ =>
        Whiteboard.create({ name: 'Renovation', host: 'Blanca Sanchez', userId: 3, startTime: '02:30', date: '2017-11-27' })
      )
      .then(_ =>
        Whiteboard.create({ name: 'Franchising', host: 'Maria Betances', userId: 4, startTime: '03:30', date: '2017-11-27' })
      )
      .then(_ =>
        Whiteboard.create({ name: 'Chai Tea', host: 'Erica Chai', userId: 5, startTime: '04:45', date: '2017-11-27' })
      )
      .then(_ =>
        Whiteboard.create({ name: 'Annual Company Party', host: 'Erica Chai', userId: 5, startTime: '04:45', date: '2017-12-23' })
      )
      .then(_ =>
        Whiteboard.create({ name: 'Company Logo', host: 'Evlis Henry', userId: 6, startTime: '06:30', date: '2017-11-27' })
      )
      .then(_ =>
        Whiteboard.create({ name: 'Expanind the Company', host: 'Blanca Sanchez', userId: 3, startTime: '06:00', date: '2018-01-02' })
      )
  ])

  await Promise.all([
    Message.create({ text: "I'm posting this message here", userId: 1, whiteboardId: 1 }),
    Message.create({ text: 'Can I delete my own message', userId: 4, whiteboardId: 1 }),
    Message.create({ text: "I'm just sending this to join the chat ", userId: 6, whiteboardId: 1 }),
    Message.create({ text: 'Do you know any good vegan places besides Chipotle?', userId: 5, whiteboardId: 1 }),
    Message.create({ text: 'Just some random text to go here', userId: 3, whiteboardId: 1 }),
    Message.create({ text: "Welcome To GH's Demo Day", userId: 3, whiteboardId: 7 }),
    Message.create({ text: 'Enjoy IdeaStorm.', userId: 4, whiteboardId: 7 }),
    Message.create({ text: "Don't forget to leave feedback!", userId: 5, whiteboardId: 7 }),
    Message.create({ text: "We'd love to know what you think", userId: 6, whiteboardId: 7 })

  ])
  await Promise.all([
    Note.create({ text: 'The Best Idea In The World', highlighted: true, link: 'http://www.github.com', userId: 6, whiteboardId: 1, position: [620, 95] }),
    Note.create({ text: 'Just about the worst Idea Ever', userId: 1, whiteboardId: 1, position: [800, 95] }),
    Note.create({ text: "I'm just a lone note", userId: 2, whiteboardId: 2, position: [620, 95] }),
    Note.create({ text: 'I wanna be a branch off the best idea', image: 'http://completecarnivore.com/wp-content/uploads/2016/07/short-rib-location.jpg', userId: 4, whiteboardId: 1, position: [620, 95] }),
    Note.create({ text: 'IdeaStorm', highlighted: true, link: 'https://idea-storm.herokuapp.com/', userId: 6, whiteboardId: 7, position: [620, 95], color: '#fcb900', votes: 5 }),
    Note.create({ text: 'Whiskr', userId: 2, whiteboardId: 7, position: [680, 295], color: '#00d084' }),
    Note.create({ text: 'CodeNames', userId: 2, whiteboardId: 7, position: [120, 335], color: '#00d084' }),
    Note.create({ text: 'Triphub', userId: 2, whiteboardId: 7, position: [800, 500], color: '#00d084' }),
    Note.create({ text: 'Git It Done', userId: 2, whiteboardId: 7, position: [880, 45], color: '#00d084' }),
    Note.create({ text: 'Global Kitchen', userId: 2, whiteboardId: 7, position: [800, 600], color: '#00d084' }),
    Note.create({ text: 'Cowuill', userId: 2, whiteboardId: 7, position: [920, 93], color: '#00d084' })



  ])

  await Promise.all([
    Attendees.create({ userId: 2, whiteboardId: 1 }),
    Attendees.create({ userId: 3, whiteboardId: 1 }),
    Attendees.create({ userId: 4, whiteboardId: 1 }),
    Attendees.create({ userId: 5, whiteboardId: 1 }),
    Attendees.create({ userId: 6, whiteboardId: 1 }),
    Attendees.create({ userId: 1, whiteboardId: 1 }),

    Attendees.create({ userId: 1, whiteboardId: 2 }),
    Attendees.create({ userId: 5, whiteboardId: 2 }),
    Attendees.create({ userId: 3, whiteboardId: 2 }),
    Attendees.create({ userId: 4, whiteboardId: 2 }),
    Attendees.create({ userId: 2, whiteboardId: 3 }),
    Attendees.create({ userId: 3, whiteboardId: 3 }),
    Attendees.create({ userId: 1, whiteboardId: 3 }),
    Attendees.create({ userId: 4, whiteboardId: 3 }),
    Attendees.create({ userId: 5, whiteboardId: 3 }),
    Attendees.create({ userId: 6, whiteboardId: 3 }),

    Attendees.create({ userId: 3, whiteboardId: 4 }),
    Attendees.create({ userId: 1, whiteboardId: 4 }),
    Attendees.create({ userId: 2, whiteboardId: 4 }),
    Attendees.create({ userId: 4, whiteboardId: 4 }),
    Attendees.create({ userId: 5, whiteboardId: 4 }),
    Attendees.create({ userId: 6, whiteboardId: 4 }),

    Attendees.create({ userId: 1, whiteboardId: 5 }),
    Attendees.create({ userId: 2, whiteboardId: 5 }),
    Attendees.create({ userId: 3, whiteboardId: 5 }),
    Attendees.create({ userId: 5, whiteboardId: 5 }),
    Attendees.create({ userId: 4, whiteboardId: 5 }),
    Attendees.create({ userId: 6, whiteboardId: 5 }),

    Attendees.create({ userId: 4, whiteboardId: 6 }),
    Attendees.create({ userId: 1, whiteboardId: 6 }),
    Attendees.create({ userId: 2, whiteboardId: 6 }),
    Attendees.create({ userId: 3, whiteboardId: 6 }),
    Attendees.create({ userId: 5, whiteboardId: 6 }),
    Attendees.create({ userId: 6, whiteboardId: 6 }),

    Attendees.create({ userId: 3, whiteboardId: 7 }),
    Attendees.create({ userId: 4, whiteboardId: 7 }),
    Attendees.create({ userId: 5, whiteboardId: 7 }),
    Attendees.create({ userId: 6, whiteboardId: 7 }),
    Attendees.create({ userId: 1, whiteboardId: 7 }),
    Attendees.create({ userId: 2, whiteboardId: 7 })

  ])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log('seeded')
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')

