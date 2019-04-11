import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const getSize = size => {
  let number
  if (size === 'sm') {
    number = 3
  } else if (size === 'md') {
    number = 5
  } else if (size === 'lg') {
    number = 15
  } else {
    number = 5
  }
  return `
        width: ${number}rem;
        height: ${number}rem;
        `
}

const Container = styled.div`
  ${props => getSize(props.size)}
  background-image: url(${props => props.url});
  background-size: cover;
  border-radius: 50%;
`

const Avatar = ({
  size = 'sm',
  url = 'https://initia.org/wp-content/uploads/2017/07/default-profile.png',
  ...props
}) => <Container size={size} url={url} {...props} />

Avatar.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  url: PropTypes.string
}

export default Avatar
