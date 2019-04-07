import { prisma } from '../../../prisma/generated/prisma-client'

export default {
  Mutation: {
    createMessage: async (_, { data }, { userId, isAuthenticated }) => {
      isAuthenticated(userId)

      const { text, chatId } = data
      let { toId } = data

      // Create new Chat if chatId not given
      if (!chatId) {
        if (!toId) throw new Error('Either chatId or toId should be provided')

        return prisma.createMessage({
          text,
          from: {
            connect: {
              id: userId
            }
          },
          to: {
            connect: {
              id: toId
            }
          },
          chat: {
            create: {
              participants: {
                connect: [
                  {
                    id: userId
                  },
                  {
                    id: toId
                  }
                ]
              }
            }
          }
        })
      } else {
        // ChatId is provided AND MABY NOT toId
        // Check participation in chat
        const isParticipated = await prisma.$exists.chat({
          AND: [
            {
              participants_some: {
                id: userId
              }
            },
            {
              id: chatId
            }
          ]
        })

        if (!isParticipated) throw new Error('Not Authorized')

        if (!toId) {
          const participants = await prisma.chat({ id: chatId }).participants()
            .$fragment(`
            fragment UserWithId on User {
              id
            }
          `)

          toId = participants.filter(o => o.id !== userId)[0].id
        }

        return prisma.createMessage({
          text,
          from: {
            connect: {
              id: userId
            }
          },
          to: {
            connect: {
              id: toId
            }
          },
          chat: {
            connect: {
              id: chatId
            }
          }
        })
      }
    }
  }
}
