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

export const TOGGLE_LIKE = gql`
	mutation toggleLike($postId: ID!) {
		toggleLike(postId: $postId)
	}
`

export const CREATE_COMMENT = gql`
	mutation createComment($postId: ID!, $text: String!) {
		createComment(postId: $postId, text: $text) {
			id
			text
			user {
				id
				username
			}
		}
	}
`

export const FEEDS = gql`
	{
		posts {
			id
			location
			caption
			createdAt
			likesCount
			isLiked
			user {
				id
				avatar
				username
			}
			files {
				id
				url
			}
			comments {
				id
				text
				user {
					id
					username
				}
			}
		}
	}
`
