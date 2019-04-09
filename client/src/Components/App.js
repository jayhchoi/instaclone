import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { ThemeProvider } from 'styled-components'

import GlobalStyles from '../Styles/GlobalStyles'
import theme from '../Styles/Theme'
import Router from '../Router'

const IS_AUTHENTICATED = gql`
  {
    isAuthenticated @client
  }
`

const App = () => {
  const {
    data: { isAuthenticated }
  } = useQuery(IS_AUTHENTICATED)

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Router isAuthenticated={!isAuthenticated} />
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  )
}

export default App
