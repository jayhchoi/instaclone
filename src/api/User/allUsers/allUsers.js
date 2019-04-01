export default {
  Query: {
    allUsers: (_, { id, query, first, skip, after, orderBy }, { prisma }) => {
      const opArgs = {
        first,
        skip,
        after,
        orderBy
      }

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
