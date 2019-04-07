import { prisma } from '../../../prisma/generated/prisma-client'

export default {
  Query: {
    user: (_, { where }) => {
      return prisma.user(where)
    }
  }
}
