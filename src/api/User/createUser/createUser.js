export default {
  Mutation: {
    createUser: async (_, { data }, { prisma }) => {
      const user = await prisma.createUser(data)
      return user
    }
  }
}
