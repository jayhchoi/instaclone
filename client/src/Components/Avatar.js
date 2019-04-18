import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const getSize = size => {
  let number
  if (size === 'sm') {
    number = '3rem'
  } else if (size === 'md') {
    number = '5rem'
  } else if (size === 'lg') {
    number = '15rem'
  } else if (size === 'auto') {
    number = '40%'
  } else {
    number = 5
  }
  return `
        width: ${number};
        height: ${number};
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
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'auto']),
  url: PropTypes.string
}

export default Avatar
