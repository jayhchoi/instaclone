import React from 'react'
import styled, { keyframes } from 'styled-components'

import { Logo } from './Icons'

const Animation = keyframes`
  0% {
    opacity: 0;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.4);


  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
`
const StyledLoader = styled.div`
  margin: auto;
  animation: ${Animation} 1s linear infinite;
`

const Loader = () => {
  return (
    <StyledLoader>
      <Logo size={36} />
    </StyledLoader>
  )
}

export default Loader
