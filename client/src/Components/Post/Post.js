import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useInput from '../../Hooks/useInput'

import PostPresenter from './PostPresenter'

const Post = ({
  id,
  location,
  caption,
  createdAt,
  likeCounts,
  isLiked,
  user,
  files,
  comments
}) => {
  return (
    <PostPresenter
      key={id}
      id={id}
      location={location}
      caption={caption}
      createdAt={createdAt}
      likeCounts={likeCounts}
      isLiked={isLiked}
      user={user}
      files={files}
      comments={comments}
    />
  )
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.string,
  caption: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  likeCounts: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired
}

export default Post
