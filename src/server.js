import { GraphQLServer } from 'graphql-yoga'
import logger from 'morgan' // This logs server status i.g. POST 200, GET 401...
import schema from './schema'
import './passport'
import { authenticateJwt } from './passport'

const PORT = process.env.PORT || 4000

const server = new GraphQLServer({
  schema,
  context({ request }) {
    return {
      user: request.user
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
