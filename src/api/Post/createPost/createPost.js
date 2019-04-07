import { prisma } from '../../../prisma/generated/prisma-client'

export default {
  Mutation: {
    createPost: async (
      _,
      { data: { caption, location, urls } },
      { userId, isAuthenticated }
    ) => {
      isAuthenticated(userId)
      const post = await prisma.createPost({
        caption,
        location,
        user: {
          connect: {
            id: userId
          }
        }
      })

      urls.forEach(async url => {
        await prisma.createFile({
          url,
          post: { connect: { id: post.id } }
        })
      })

      return prisma.post({ id: post.id })
    }
  }
}
