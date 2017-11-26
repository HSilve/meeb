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
const {User, Message, Note, Whiteboard, Attendees} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  await Promise.all([
    User.create({email: 'cody@email.com', password: '123', name: 'Cody D. Dog'}),
    User.create({email: 'murphy@email.com', password: '123', name: 'Murphy A. Law'}),
    User.create({email: 'Blanca@email.com', password: '456', name: 'Blanca Sanchez'}),
    User.create({email: 'Maria@email.com', password: '456', name: 'Maria Betances'}),
    User.create({email: 'Erica@email.com', password: '456', name: 'Erica Chai'}),
    User.create({email: 'Evlis@email.com', password: '456', name: 'Evlis Henry'})
  ])
  await Promise.all([
    Whiteboard.create({name: 'Best Dog Treats', host: 'Cody', userId: 1, startTime: '04:30', date: '2017-10-27'}),
    Whiteboard.create({name: 'FullStack', host: 'Murphy', userId: 2, startTime: '04:30', date: '2017-11-25'}),
    Whiteboard.create({name: "Blanca's Room", host: 'Blanca Sanchez', userId: 3, startTime: '02:30', date: '2017-11-27'}),
    Whiteboard.create({name: "Maria's Room", host: 'Maria Betances', userId: 4, startTime: '03:30', date: '2017-11-27'}),
    Whiteboard.create({name: 'Chai Tea', host: 'Erica Chai', userId: 5, startTime: '04:45', date: '2017-11-27'}),
    Whiteboard.create({name: 'A Really Awsome Room ', host: 'Evlis Henry', userId: 6, startTime: '06:30', date: '2017-11-27'})
  ])

  await Promise.all([
    Message.create({text: "I'm posting this message here", userId: 1, whiteboardId: 1 }),
    Message.create({text: 'Can I delete my own message', userId: 4, whiteboardId: 1 }),
    Message.create({text: "I'm just sending this to join the chat ", userId: 6, whiteboardId: 1 }),
    Message.create({text: 'Do you know any good vegan places besides Chipotle?', userId: 5, whiteboardId: 1 }),
    Message.create({text: 'Just some random text to go here', userId: 3, whiteboardId: 1 }),
    Message.create({text: 'Hey, do not forget about me', userId: 2, whiteboardId: 1 })
  ])
  await Promise.all([
    Note.create({text: 'The Best Idea In The World', highlighted: true, link: 'http://www.github.com', userId: 6, whiteboardId: 1}),
    Note.create({text: 'Just about the worst Idea Ever', userId: 1, whiteboardId: 1 }),
    Note.create({text: "I'm just a lone note", userId: 2, whiteboardId: 2 }),
    Note.create({text: 'I wanna be a branch off the best idea', image: 'http://completecarnivore.com/wp-content/uploads/2016/07/short-rib-location.jpg', userId: 4, whiteboardId: 1 })
  ])

  await Promise.all([
    Attendees.create({userId: 2, whiteboardId: 1}),
    Attendees.create({userId: 3, whiteboardId: 1}),
    Attendees.create({userId: 4, whiteboardId: 1}),
    Attendees.create({userId: 5, whiteboardId: 1}),
    Attendees.create({userId: 6, whiteboardId: 1}),
    Attendees.create({userId: 1, whiteboardId: 1}),
    Attendees.create({userId: 1, whiteboardId: 2}),
    Attendees.create({userId: 5, whiteboardId: 2}),
    Attendees.create({userId: 3, whiteboardId: 2}),
    Attendees.create({userId: 4, whiteboardId: 2}),
    Attendees.create({userId: 2, whiteboardId: 3}),
    Attendees.create({userId: 1, whiteboardId: 3}),
    Attendees.create({userId: 4, whiteboardId: 3}),
    Attendees.create({userId: 5, whiteboardId: 3}),
    Attendees.create({userId: 6, whiteboardId: 3}),
    Attendees.create({userId: 3, whiteboardId: 4}),
    Attendees.create({userId: 1, whiteboardId: 4}),
    Attendees.create({userId: 2, whiteboardId: 4}),
    Attendees.create({userId: 5, whiteboardId: 4}),
    Attendees.create({userId: 6, whiteboardId: 4}),
    Attendees.create({userId: 1, whiteboardId: 5}),
    Attendees.create({userId: 2, whiteboardId: 5}),
    Attendees.create({userId: 3, whiteboardId: 5}),
    Attendees.create({userId: 5, whiteboardId: 5}),
    Attendees.create({userId: 6, whiteboardId: 5}),
    Attendees.create({userId: 4, whiteboardId: 6}),
    Attendees.create({userId: 1, whiteboardId: 6}),
    Attendees.create({userId: 2, whiteboardId: 6}),
    Attendees.create({userId: 3, whiteboardId: 6}),
    Attendees.create({userId: 5, whiteboardId: 6}),
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


//message
//note
//user
//whiteboard
