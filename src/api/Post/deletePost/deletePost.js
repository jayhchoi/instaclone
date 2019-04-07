import { prisma } from '../../../prisma/generated/prisma-client'

export default {
  Mutation: {
    deletePost: async (_, { id }, { userId, isAuthenticated }) => {
      isAuthenticated(userId)

      // Check for ownership
      const isOwned = prisma.$exists.post({
        id,
        user: {
          id: userId
        }
      })

      if (!isOwned) throw new Error('Not authorized')

      return prisma.deletePost({
        id
      })
    }
  }
}
