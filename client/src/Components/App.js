import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import styled, { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'

import AuthContext from '../context/AuthContext'
import GlobalStyles from '../Styles/GlobalStyles'
import theme from '../Styles/Theme'
import Routes from '../Routes'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import Auth from '../Routes/Auth'

const IS_AUTHENTICATED = gql`
	{
		isAuthenticated @client
	}
`

const View = styled.div`
	max-width: ${({ theme }) => theme.size.maxWidth};
	width: 100%;
	min-height: 100vh;
	margin: 0 auto;
	margin-top: ${({ theme }) => theme.size.navHeight};
	padding: 5rem 0;
`

const AuthView = styled(View)`
	padding-top: 15vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const App = () => {
	const {
		data: { isAuthenticated }
	} = useQuery(IS_AUTHENTICATED)

	return (
		<ThemeProvider theme={theme}>
			<AuthContext.Provider value={isAuthenticated}>
				<GlobalStyles />
				<Router>
					{isAuthenticated ? (
						<View>
							<Header />
							<Routes />
							<Footer />
						</View>
					) : (
						<AuthView>
							<Auth />
							<Footer />
						</AuthView>
					)}
				</Router>
				<ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
			</AuthContext.Provider>
		</ThemeProvider>
	)
}

export default App
