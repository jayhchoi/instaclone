import React from './node_modules/react'
import GlobalStyles from '../Styles/GlobalStyles'
import { ThemeProvider } from 'styled-components'
import theme from '../Styles/Theme'

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
  </ThemeProvider>
)

export default App
