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
  likeCount,
  isLiked,
  user,
  files,
  comments
}) => {
  // STATES
  const [isLikedState, setIsLikedState] = useState(isLiked)
  const [likeCountState, setLikeCountState] = useState(likeCount)
  const [commentsState, setCommentsState] = useState(comments)
  const [currentItem, setCurrentItem] = useState(0)

  // INPUTS
  const commentInput = useInput({
    name: 'comment',
    placeholder: '댓글을 추가하세요...'
  })

  // MUTATIONS
  const toggleLikeMutation = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  })
  const createCommentMutation = useMutation(CREATE_COMMENT, {
    variables: { postId: id, text: commentInput.value }
  })

  //
  const slide = () => {
    const totalFiles = files.length
    if (currentItem === totalFiles - 1) {
      setTimeout(() => setCurrentItem(0), 3000)
    } else {
      setTimeout(() => setCurrentItem(currentItem + 1), 3000)
    }
  }

  const onHeartClick = () => {
    toggleLikeMutation()
    setIsLikedState(!isLikedState)
    setLikeCountState(!isLikedState ? likeCountState + 1 : likeCountState - 1)
  }

  const onCommentEnter = async e => {
    const { which } = e
    if (which === 13) {
      e.preventDefault()
      commentInput.reset()
      const {
        data: { createComment: newComment }
      } = await createCommentMutation()
      setCommentsState([...commentsState, newComment])
    }
  }

  // NEEDS REVIEW HERE...
  useEffect(() => {
    slide()
  }, [currentItem])

  return (
    <PostPresenter
      location={location}
      caption={caption}
      createdAt={createdAt}
      user={user}
      files={files}
      ///////////////////////
      comments={commentsState}
      likeCount={likeCountState}
      isLiked={isLikedState}
      commentInput={commentInput}
      currentItem={currentItem}
      onHeartClick={onHeartClick}
      onCommentEnter={onCommentEnter}
    />
  )
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.string,
  caption: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
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
