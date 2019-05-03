import { gql } from 'apollo-boost'

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
