import { prisma } from '../../prisma/generated/prisma-client'

export default {
  Message: {
    from: parent => {
      return prisma.message({ id: parent.id }).from()
    },
    to: parent => {
      return prisma.message({ id: parent.id }).to()
    },
    chat: parent => {
      return prisma.message({ id: parent.id }).chat()
    }
  }
}
