// LET'S UPDATE THIS LATER TO ALSO UPDATE PHOTOS!!!!!!!!

import { prisma } from '../../../prisma/generated/prisma-client'

export default {
  Mutation: {
    updatePost: async (
      _,
      { data: { caption, location }, id },
      { userId, isAuthenticated }
    ) => {
      isAuthenticated(userId)

      // Check for ownership
      const isOwned = await prisma.$exists.post({
        id,
        user: {
          id: userId
        }
      })

      if (!isOwned) throw new Error('Not authorized')

      return prisma.updatePost({
        where: {
          id
        },
        data: {
          caption,
          location
        }
      })
    }
  }
}
