import { prisma } from '../../prisma/generated/prisma-client'

export default {
  Comment: {
    user: parent => {
      return prisma.comment({ id: parent.id }).user()
    }
  }
}
