import { prisma } from '../../../prisma/generated/prisma-client'

export default {
  Mutation: {
    updateUser: (_, { data }, { userId, isAuthenticated }) => {
      isAuthenticated(userId)

      return prisma.updateUser({
        where: {
          id: userId
        },
        data
      })
    }
  }
}
