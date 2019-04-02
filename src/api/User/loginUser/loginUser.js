import { generateToken } from '../../../utils'
import { prisma } from '../../../prisma/generated/prisma-client'

export default {
  Mutation: {
    confirmSecret: async (_, { email, secret }) => {
      const user = await prisma.user({ email })
      if (user.loginSecret !== secret) throw new Error('Unable to login')

      return {
        token: generateToken(user.id),
        user
      }
    }
  }
}
