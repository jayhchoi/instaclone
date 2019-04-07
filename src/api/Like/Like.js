import { prisma } from '../../prisma/generated/prisma-client'

export default {
  Like: {
    user: parent => {
      return prisma.like({ id: parent.id }).user()
    }
  }
}
