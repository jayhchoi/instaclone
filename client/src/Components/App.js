import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import styled, { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'

import GlobalStyles from '../Styles/GlobalStyles'
import theme from '../Styles/Theme'
import Routes from '../Routes'
import Footer from '../Components/Footer'
import Header from '../Components/Header'

const IS_AUTHENTICATED = gql`
  {
    isAuthenticated @client
  }
`

const Wrapper = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding-top: 12rem;
`

const App = () => {
  const {
    data: { isAuthenticated }
  } = useQuery(IS_AUTHENTICATED)

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Router>
          <Wrapper>
            <Header />
            <Routes isAuthenticated={isAuthenticated} />
            <Footer />
          </Wrapper>
        </Router>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  )
}

export default App
