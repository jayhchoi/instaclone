import { isAuthenticated } from '../../../middlewares'
import { prisma } from '../../../prisma/generated/prisma-client'

export default {
  Mutation: {
    toggleLike: async (_, { postId }, { userId }) => {
      isAuthenticated(userId)
      const like = await prisma.likes({
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

      if (like.length > 0) {
        await prisma.deleteLike({
          id: like[0].id
        })
        return false
      } else {
        await prisma.createLike({
          user: {
            connect: {
              id: user.id
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
