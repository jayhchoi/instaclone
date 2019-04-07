import { generateToken } from '../../../utils'
import { prisma } from '../../../prisma/generated/prisma-client'

export default {
  Mutation: {
    loginUser: async (_, { email, secret }) => {
      const user = await prisma.user({ email })
      if (user.loginSecret !== secret) throw new Error('Unable to login')
      await prisma.updateUser({
        where: {
          id: user.id
        },
        data: {
          loginSecret: ''
        }
      })
      return {
        token: generateToken(user.id),
        user
      }
    }
  }
}
