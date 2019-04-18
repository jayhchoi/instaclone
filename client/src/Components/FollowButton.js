import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from 'react-apollo-hooks'
import { toast } from 'react-toastify'
import Button from './Button'
import { gql } from 'apollo-boost'

const TOGGLE_FOLLOW = gql`
  mutation ToggleFollow($followingId: ID!) {
    toggleFollow(followingId: $followingId) {
      id
    }
  }
`

const FollowButton = ({ isFollowed, followingId }) => {
  const [following, setFollowing] = useState(isFollowed)

  const toggleFollowMutation = useMutation(TOGGLE_FOLLOW, {
    variables: {
      followingId
    }
  })

  const onClick = async () => {
    try {
      await toggleFollowMutation()
      setFollowing(!following)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return <Button onClick={onClick}>{following ? 'Unfollow' : 'Follow'}</Button>
}

FollowButton.propTypes = {
  isFollowed: PropTypes.bool.isRequired,
  followingId: PropTypes.string.isRequired
}

export default FollowButton
