import jwt from 'jsonwebtoken'

export const defaults = {
	isAuthenticated:
		localStorage.getItem('token') &&
		jwt.verify(localStorage.getItem('token'), process.env.REACT_APP_JWT_SECRET, err => {
			if (err) return false
			return true
		})
}

export const resolvers = {
	Mutation: {
		authenticateUser: (_, { token }, { cache }) => {
			localStorage.setItem('token', token)
			cache.writeData({
				data: {
					isAuthenticated: true
				}
			})
			return null
		},
		logoutUser: (_, args, { cache }) => {
			localStorage.removeItem('token')
			window.location('/')
			return null
		}
	}
}
