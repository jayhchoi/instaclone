import { prisma } from '../../../prisma/generated/prisma-client'
import { isAuthenticated } from '../../../middlewares'

export default {
  Mutation: {
    createComment: (_, { postId, text }, { userId }) => {
      isAuthenticated(userId)
      return prisma.createComment({
        text,
        post: {
          connect: {
            id: postId
          }
        },
        user: {
          connect: {
            id: userId
          }
        }
      })
    }
  }
}
