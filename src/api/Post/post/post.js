import { prisma } from '../../../prisma/generated/prisma-client'

export default {
  Query: {
    post: (_, { postId }) => {
      return prisma.post({
        id: postId
      })
    }
  }
}
