import { isAuthenticated } from '../../../middlewares'
import { prisma } from '../../../prisma/generated/prisma-client'

export default {
  Mutation: {
    toggleFollow: async (_, { followingId }, { userId }) => {
      isAuthenticated(userId)

      // Check if already following
      const alreadyFollowing = await prisma.$exists.user({
        AND: [
          {
            id: userId
          },
          {
            following_some: {
              id: followingId
            }
          }
        ]
      })

      // Unfollow
      if (alreadyFollowing) {
        return prisma.updateUser({
          where: {
            id: userId
          },
          data: {
            following: {
              disconnect: {
                id: followingId
              }
            }
          }
        })
      } else {
        // Follow
        return prisma.updateUser({
          where: {
            id: userId
          },
          data: {
            following: {
              connect: {
                id: followingId
              }
            }
          }
        })
      }
    }
  }
}
