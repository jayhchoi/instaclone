import { gql } from 'apollo-boost'

export const ME = gql`
	{
		me {
			username
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
			likeCount
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
