import { prisma } from '../../../prisma/generated/prisma-client'

export default {
  Query: {
    userById: (_, { userId }) => {
      return prisma.user({ id: userId })
    }
  }
}
