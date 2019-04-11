import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useInput from '../../Hooks/useInput'

import PostPresenter from './PostPresenter'
import { useMutation } from 'react-apollo-hooks'
import { TOGGLE_LIKE, CREATE_COMMENT } from './PostQueries'

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
  const [isLikedState, setIsLiked] = useState(isLiked)
  const [likeCountsState, setLikeCounts] = useState(likeCounts)
  const [currentItem, setCurrentItem] = useState(0)
  const commentInput = useInput({
    name: 'comment',
    placeholder: '댓글을 추가하세요...'
  })

  const toggleLikeMutation = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  })
  const createCommentMutation = useMutation(CREATE_COMMENT, {
    variables: { postId: id, text: commentInput.value }
  })

  const slide = () => {
    const totalFiles = files.length
    if (currentItem === totalFiles - 1) {
      setTimeout(() => setCurrentItem(0), 3000)
    } else {
      setTimeout(() => setCurrentItem(currentItem + 1), 3000)
    }
  }

  const toggleLike = () => {
    toggleLikeMutation()
    setIsLiked(!isLikedState)
    setLikeCounts(!isLikedState ? likeCountsState + 1 : likeCountsState - 1)
  }

  const createComment = () => {}

  useEffect(() => {
    slide()
  }, [currentItem])

  return (
    <PostPresenter
      id={id}
      location={location}
      caption={caption}
      createdAt={createdAt}
      user={user}
      files={files}
      comments={comments}
      ///////////////////////
      likeCounts={likeCountsState}
      isLiked={isLikedState}
      commentInput={commentInput}
      setIsLiked={setIsLiked}
      setLikeCounts={setLikeCounts}
      currentItem={currentItem}
      toggleLike={toggleLike}
      createComment={createComment}
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
