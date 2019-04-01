export default {
  Query: {
    userById: (_, { id }, { prisma }) => {
      return prisma.user({ id })
    }
  }
}
