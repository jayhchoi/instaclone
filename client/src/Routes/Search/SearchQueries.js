import { gql } from 'apollo-boost'

export const SEARCH = gql`
	query search($query: String!) {
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
