import { prisma } from '../../../prisma/generated/prisma-client'

export default {
  Mutation: {
    createUser: async (_, { data }) => {
      try {
        const user = await prisma.createUser(data)

        return {
          created: true,
          user
        }
      } catch (error) {
        console.log(error)

        return {
          created: false,
          user: null
        }
      }
    }
  }
}
