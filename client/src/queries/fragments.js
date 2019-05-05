import { gql } from 'apollo-boost'

export const USER_FRAGMENTS = gql`
	fragment userScalarFields on User {
		id
		avatar
		username
		email
		firstName
		lastName
		fullName
		bio
		isFollowed
		isMe
		postsCount
		followingCount
		followersCount
		createdAt
		updatedAt
	}
`

export const POST_FRAGMENTS = gql`
	fragment postScalarFields on Post {
		id
		caption
		likesCount
		commentsCount
		isLiked
		location
		createdAt
		updatedAt
	}
`
