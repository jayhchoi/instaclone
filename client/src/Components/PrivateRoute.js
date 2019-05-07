import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'

const PrivateRoute = ({
	component: Component, // receive component prop and call it Component
	redirect = '/',
	...rest
}) => {
	const isAuthenticated = useAuthContext()

	return (
		<Route
			{...rest} // path, exact, ...
			render={props =>
				isAuthenticated ? (
					<Component {...props} /> // props passed into the component
				) : (
					<Redirect
						to={{
							pathname: redirect,
							state: { from: props.location }
						}}
					/>
				)
			}
		/>
	)
}

export default PrivateRoute
