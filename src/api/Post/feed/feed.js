import { prisma } from '../../../prisma/generated/prisma-client'

export default {
  Query: {
    feed: async (_, args, { userId, isAuthenticated }) => {
      isAuthenticated(userId)

      const following = await prisma.user({ id: userId }).following()
        .$fragment(`
        fragment UserIdFragment on User {
          id
        }
      `)

      const followingIds = following.map(o => o.id)

      return prisma.posts({
        where: {
          user: {
            id_in: [...followingIds, userId]
          }
        },
        orderBy: 'createdAt_DESC'
      })
    }
  }
}
