import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export default createGlobalStyle`
  ${reset}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    height: 100%;
  }

  body {
    font-size: 1.6rem;
    background-color: ${props => props.theme.greyColor};
    color: ${props => props.theme.blackColor};
  }

  a {
    color: ${props => props.theme.blueColor};
    text-decoration: none;
  }
`
