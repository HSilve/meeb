const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {User} = require('../db/models')
module.exports = router

/*
we register with google
- they give us clientId and secret (key)
- we register our domain(s) and possible callback(s)


1. User clicks a button to login with google
P 2. We redirect the user to google with some info (in the url as a query)
  - scope -- ?scope=email
  - clientId (like our username) -- so google knows they are authorizing X (us)
  - callbackUrl -- ?callback=https://kldasjsdlkflksdj
X 3. User now asks google to oauth login (by the url we redirected the user with)
X 4. Google displays the page and asks for login / approval for Y scope
X 5. User logs in successfully
X 6. Google now redirects user with the callbackurl supplied with a token (authcode specific to this user)
7. User now hits our callback url (google redirected to here)
P 8. We ask google for information
  - authcode (token from user)
  - clientId (username)
  - secret (password)
X 9. Google checks us out, then checks if the authcode matches something they have stored, then they check if that authcode is associated with our clientId, then they send the amount of info approved (scope)
P/U 10. Store this info in the db (findOrCreate) AND save it on our session so this user is logged in for future requests
11. Now we tell the user "YAYYYYYYYY" */



/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
}

const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
  const googleId = profile.id
  const name = profile.displayName
  const email = profile.emails[0].value

  User.find({where: {googleId}})
    .then(user => user
      ? done(null, user) // what does done call?? calls serializeUser --> session has the userId and all future requests have them logged in
      : User.create({name, email, googleId})
        .then(user => done(null, user))
    )
    .catch(done)
})

passport.use(strategy)

router.get('/', passport.authenticate('google', {scope: 'email'}))

router.get('/callback', passport.authenticate('google', {
  successRedirect: '/home',
  failureRedirect: '/login'
}))






