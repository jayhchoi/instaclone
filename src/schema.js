import path from 'path'
import { makeExecutableSchema } from 'graphql-tools'
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas'

const typeDefs = fileLoader(path.join(__dirname, '/api/**/*.graphql')) // All files ending .graphql
const resolvers = fileLoader(path.join(__dirname, '/api/**/*.js')) // All files ending .js

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(typeDefs),
  resolvers: mergeResolvers(resolvers)
})

export default schema
