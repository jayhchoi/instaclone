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
    background-color: ${props => props.theme.color.grey};
    color: ${props => props.theme.color.black};
  }

  a {
    color: ${props => props.theme.color.blue};
    text-decoration: none;
  }
`
