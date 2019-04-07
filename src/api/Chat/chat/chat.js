import { prisma } from '../../../prisma/generated/prisma-client'

export default {
  Query: {
    chat: (_, { where }, { userId, isAuthenticated }) => {
      isAuthenticated(userId)

      return prisma.chat(where)
    }
  }
}
