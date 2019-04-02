import {prisma } from '../../../prisma/generated/prisma-client'

export default {
  Mutation: {
    createUser: (_, { data }) => {
      return await prisma.createUser(data)
    }
  }
}
