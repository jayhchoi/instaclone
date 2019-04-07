import { prisma } from '../../../prisma/generated/prisma-client'

export default {
  Query: {
    chats: (_, args, { userId, isAuthenticated }) => {
      isAuthenticated(userId)

      return prisma.chats({
        where: {
          participants_some: {
            id: userId
          }
        }
      })
    }
  }
}
