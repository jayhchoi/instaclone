import { isAuthenticated } from '../../../middlewares'
import { prisma } from '../../../prisma/generated/prisma-client'

export default {
  Mutation: {
    toggleLike: async (_, { postId }, { userId }) => {
      isAuthenticated(userId)
      const [like] = await prisma.likes({
        where: {
          AND: [
            {
              user: {
                id: userId
              }
            },
            {
              post: {
                id: postId
              }
            }
          ]
        }
      })

      if (like) {
        await prisma.deleteLike({
          id: like.id
        })
        return false
      } else {
        await prisma.createLike({
          user: {
            connect: {
              id: userId
            }
          },
          post: {
            connect: {
              id: postId
            }
          }
        })
        return true
      }
    }
  }
}
