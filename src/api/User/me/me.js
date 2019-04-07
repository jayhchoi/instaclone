import { prisma } from '../../../prisma/generated/prisma-client'

export default {
  Query: {
    me: (_, args, { userId, isAuthenticated }) => {
      isAuthenticated(userId)

      return prisma.user({ id: userId })
    }
  }
}
