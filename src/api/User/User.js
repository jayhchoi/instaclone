import { prisma } from '../../prisma/generated/prisma-client'

export default {
  User: {
    posts: parent => {
      return prisma.user({ id: parent.id }).posts()
    },
    comments: parent => {
      return prisma.user({ id: parent.id }).comments()
    },
    likes: parent => {
      return prisma.user({ id: parent.id }).likes()
    },
    following: parent => {
      return prisma.user({ id: parent.id }).following()
    },
    followers: parent => {
      return prisma.user({ id: parent.id }).followers()
    },
    chats: parent => {
      return prisma.user({ id: parent.id }).chats()
    },
    fullName: parent => `${parent.firstName} ${parent.lastName}`,
    // AUTH REQUIRED
    isFollowed: (parent, args, { userId, isAuthenticated }) => {
      isAuthenticated(userId)

      return prisma.$exists.user({
        AND: [
          {
            id: userId
          },
          {
            following_some: {
              id: parent.id
            }
          }
        ]
      })
    },
    isMe: (parent, args, { userId, isAuthenticated }) => {
      isAuthenticated(userId)

      return parent.id === userId
    }
  }
}
