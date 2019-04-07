import { GraphQLServer } from 'graphql-yoga'
import logger from 'morgan' // This logs server status i.g. POST 200, GET 401...
import schema from './schema'
import './passport'
import { authenticateJwt } from './passport'
import { isAuthenticated } from './middlewares'

const PORT = process.env.PORT || 4000

const server = new GraphQLServer({
  schema,
  context({ request }) {
    return {
      userId: request ? request.userId : null,
      isAuthenticated
    }
  }
})

// This is how to access express under graphqlYoga
server.express.use(logger('dev'))

server.express.use(authenticateJwt)

server.start(
  {
    port: PORT
  },
  () => console.log(`✅  Server running on port ${PORT}`)
)
