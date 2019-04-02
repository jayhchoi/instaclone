import { prisma } from '../../../prisma/generated/prisma-client'

export default {
  Query: {
    allUsers: (_, { query }) => {
      const opArgs = {}

      if (query) {
        opArgs.where = {
          OR: [
            {
              firstName_contains: query
            },
            {
              lastName_contains: query
            }
          ]
        }
      }
      return prisma.users(opArgs)
    }
  }
}
