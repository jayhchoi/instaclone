import { prisma } from '../../../prisma/generated/prisma-client'

export default {
  Subscription: {
    message: {
      subscribe: (_, { where: { chatId } }) => {
        return prisma.$subscribe.message({
          AND: [
            {
              mutation_in: ['CREATED', 'UPDATED']
            },
            {
              node: {
                chat: {
                  id: chatId
                }
              }
            }
          ]
        })
      },
      resolve: ({ mutation, node }) => ({
        mutation,
        node
      })
    }
  }
}
