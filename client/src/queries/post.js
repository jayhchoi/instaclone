import { gql } from 'apollo-boost'
import { POST_FRAGMENTS, USER_FRAGMENTS } from './fragments'

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

export const SEARCH = gql`
	query Search($query: String!) {
		posts(query: $query) {
			id
			files {
				url
			}
			likesCount
			commentsCount
		}
		users(query: $query) {
			id
			username
			avatar
			isFollowed
			isMe
		}
	}
`

export const FEEDS = gql`
	{
		posts {
			...postScalarFields
			user {
				...userScalarFields
			}
			files {
				id
				url
			}
			comments {
				id
				text
				user {
					...userScalarFields
				}
			}
		}
	}
	${POST_FRAGMENTS}
	${USER_FRAGMENTS}
`

export const POST = gql`
	query Post($postId: ID!) {
		post(postId: $postId) {
			...postScalarFields
			user {
				...userScalarFields
			}
			files {
				id
				url
			}
			comments {
				id
				text
				user {
					...userScalarFields
				}
			}
		}
	}
	${POST_FRAGMENTS}
	${USER_FRAGMENTS}
`
