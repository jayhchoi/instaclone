require('dotenv').config() // Import .env file
import { GraphQLServer } from 'graphql-yoga'
import logger from 'morgan' // This logs server status i.g. POST 200, GET 401...
import schema from './schema'

const PORT = process.env.PORT || 4000

const server = new GraphQLServer({
  schema
})

// This is how to access express under graphqlYoga
server.express.use(logger('dev'))

server.start(
  {
    port: PORT
  },
  () => console.log('✅Server running on port 4000')
)
