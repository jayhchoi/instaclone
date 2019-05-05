import { gql } from 'apollo-boost'
import { POST_FRAGMENTS, USER_FRAGMENTS } from './fragments'

export const USER = gql`
	query User($where: UserWhereUniqueInput!) {
		user(where: $where) {
			...userScalarFields
			posts {
				...postScalarFields
				files {
					id
					url
				}
			}
		}
	}
	${POST_FRAGMENTS}
	${USER_FRAGMENTS}
`

export const REQUEST_SECRET = gql`
	mutation requestSecret($email: String!) {
		requestSecret(email: $email) {
			mailSent
			user {
				email
			}
		}
	}
`

export const CREATE_USER = gql`
	mutation createUser($data: CreateUserInput!) {
		createUser(data: $data) {
			created
			user {
				fullName
			}
		}
	}
`

export const LOGIN_USER = gql`
	mutation loginUser($secret: String!, $email: String!) {
		loginUser(secret: $secret, email: $email) {
			token
			user {
				fullName
			}
		}
	}
`

export const AUTHENTICATE_USER = gql`
	mutation authenticateUser($token: String!) {
		authenticateUser(token: $token) @client
	}
`

export const LOGOUT_USER = gql`
	mutation LogoutUser {
		logoutUser @client
	}
`

export const ME = gql`
	{
		me {
			username
		}
	}
`
