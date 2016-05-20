

module.exports = {
  db: process.env.MONGOHQ_URL
			|| process.env.MONGOLAB_URI || process.env.MONGODB_URI
			|| 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR
			|| 'localhost') + '/knowitdevsummit',

  sessionCookie: {
    // session expiration is set by default to 24 hours
    maxAge: 24 * (60 * 60 * 1000),
    // httpOnly flag makes sure the cookie is only accessed
    // through the HTTP protocol and not JS/browser
    httpOnly: true,
    // secure cookie should be turned to true to provide additional
    // layer of security so that the cookie is set only when working
    // in HTTPS mode.
    secure: false
  },

  mail: {
    token: process.env.POSTMARK_API_KEY,
    sender: process.env.EMAIL_SENDER
  },

  sessionSecret: process.env.SESSION_SECRET || 'knowitdevsummit',
  // sessionKey is set to the generic sessionId key used by PHP applications
  // for obsecurity reasons
  sessionKey: 'sessionId',
  sessionCollection: 'sessions',
}
