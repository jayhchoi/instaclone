import { prisma } from '../../../prisma/generated/prisma-client'

export default {
  Query: {
    posts: (_, { query }) => {
      const opArgs = {}

      if (query) {
        opArgs.where = {
          OR: [
            {
              location_contains: query
            },
            {
              caption_contains: query
            }
          ]
        }
      }
      return prisma.posts(opArgs)
    }
  }
}
