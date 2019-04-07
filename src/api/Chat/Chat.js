import { prisma } from '../../prisma/generated/prisma-client'

export default {
  Chat: {
    participants: parent => {
      return prisma.chat({ id: parent.id }).participants()
    },
    messages: parent => {
      return prisma
        .chat({ id: parent.id })
        .messages({ orderBy: 'createdAt_DESC' })
    }
  }
}
