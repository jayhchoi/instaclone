import React from 'react'

const PostPresenter = ({
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
  return <div>{caption}</div>
}

export default PostPresenter
