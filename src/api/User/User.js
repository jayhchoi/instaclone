import { prisma } from '../../prisma/generated/prisma-client'

export default {
	User: {
		posts: parent => prisma.user({ id: parent.id }).posts(),
		comments: parent => prisma.user({ id: parent.id }).comments(),
		likes: parent => prisma.user({ id: parent.id }).likes(),
		following: parent => prisma.user({ id: parent.id }).following(),
		followers: parent => prisma.user({ id: parent.id }).followers(),
		chats: parent => prisma.user({ id: parent.id }).chats(),
		fullName: parent => `${parent.firstName} ${parent.lastName}`,
		postsCount: parent => {
			return prisma
				.postsConnection({ where: { user: { id: parent.id } } })
				.aggregate()
				.count()
		},
		followersCount: parent => {
			return prisma
				.usersConnection({ where: { following_some: { id: parent.id } } })
				.aggregate()
				.count()
		},
		followingCount: parent => {
			return prisma
				.usersConnection({ where: { followers_some: { id: parent.id } } })
				.aggregate()
				.count()
		},
		postsCount: parent => {
			return prisma
				.postsConnection({ where: { user: { id: parent.id } } })
				.aggregate()
				.count()
		},
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
