import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import passport from 'passport'

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

// This is middleware
export const authenticateJwt = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, userId) => {
    if (userId) req.userId = userId
    next()
  })(req, res, next)
}

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    // Passport gets jwt from Auth header and decodes it
    try {
      const userId = jwt_payload.id
      if (userId) return done(null, userId) // No err Yes user
      return done(null, false) // No err No user
    } catch (error) {
      return done(error, false) // Yes err No user
    }
  })
)

passport.initialize()
