import { prisma } from '../../../prisma/generated/prisma-client'

export default {
  Query: {
    post: (_, { where }) => {
      return prisma.post(where)
    }
  }
}
