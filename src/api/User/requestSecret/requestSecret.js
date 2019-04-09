import { generateSecret, sendSecretMail } from '../../../utils'
import { prisma } from '../../../prisma/generated/prisma-client'

export default {
  Mutation: {
    requestSecret: async (_, { email }) => {
      const loginSecret = generateSecret()
      try {
        const user = await prisma.updateUser({
          data: {
            loginSecret
          },
          where: {
            email
          }
        })

        await sendSecretMail(email, loginSecret)

        return {
          mailSent: true,
          user
        }
      } catch (error) {
        console.log(error)
        return {
          mailSent: false,
          user: null
        }
      }
    }
  }
}
