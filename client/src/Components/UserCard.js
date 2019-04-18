import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Avatar from './Avatar'
import FatText from './FatText'
import FollowButton from './FollowButton'

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  ${props => props.theme.whiteBox}
`

const StyledAvatar = styled(Avatar)`
  margin-bottom: 1.5rem;
`

const StyledLink = styled(Link)`
  color: inherit;
  margin-bottom: 1rem;
`

const UserCard = ({ username, avatar, id, isFollowed, isMe }) => (
  <Card>
    {avatar ? (
      <StyledAvatar size="auto" url={avatar} />
    ) : (
      <StyledAvatar size="auto" />
    )}
    <StyledLink to={`/${username}`}>
      <FatText text={username} />
    </StyledLink>
    {!isMe && <FollowButton isFollowed={isFollowed} followingId={id} />}
  </Card>
)

UserCard.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  isFollowed: PropTypes.bool.isRequired,
  isMe: PropTypes.bool.isRequired
}

export default UserCard
