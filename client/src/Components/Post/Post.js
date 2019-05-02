import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useInput from '../../Hooks/useInput'

import PostPresenter from './PostPresenter'
import { useMutation } from 'react-apollo-hooks'
import { TOGGLE_LIKE, CREATE_COMMENT } from './PostQueries'
import { FEEDS } from '../../queries'

const Post = ({ id, location, caption, createdAt, likeCount, isLiked, user, files, comments }) => {
	// STATES
	const [isLikedState, setIsLikedState] = useState(isLiked)
	const [likeCountState, setLikeCountState] = useState(likeCount)
	const [currentItem, setCurrentItem] = useState(0)

	// INPUTS
	const commentInput = useInput({
		name: 'comment',
		placeholder: '댓글을 추가하세요...'
	})

	// MUTATIONS
	const toggleLikeMutation = useMutation(TOGGLE_LIKE, {
		variables: { postId: id },
		update: (cache, { data: { toggleLike: isLiked } }) => {
			const { posts } = cache.readQuery({
				query: FEEDS
			})

			const updatedPosts = posts.map(p => {
				if (p.id === id) {
					p.isLiked = isLiked
					if (isLiked) {
						p.likeCount++
					} else {
						p.likeCount--
					}
				}
				return p
			})

			cache.writeQuery({
				query: FEEDS,
				data: {
					posts: updatedPosts
				}
			})
		}
	})
	const createCommentMutation = useMutation(CREATE_COMMENT, {
		variables: { postId: id, text: commentInput.value },
		update: (cache, { data: { createComment: newComment } }) => {
			const { posts } = cache.readQuery({
				query: FEEDS
			})

			const updatedPosts = posts.map(p => {
				if (p.id === id) {
					p.comments.push(newComment)
				}
				return p
			})

			cache.writeQuery({
				query: FEEDS,
				data: {
					posts: updatedPosts
				}
			})
		}
	})

	const onHeartClick = () => {
		toggleLikeMutation()
		setIsLikedState(!isLikedState)
		setLikeCountState(!isLikedState ? likeCountState + 1 : likeCountState - 1)
	}

	const onCommentEnter = e => {
		if (e.key === 'Enter') {
			e.preventDefault()
			commentInput.reset()
			createCommentMutation()
		}
	}

	// NEEDS REVIEW HERE...
	useEffect(() => {
		const totalFiles = files.length
		let timer
		if (currentItem === totalFiles - 1) {
			timer = setTimeout(() => setCurrentItem(0), 3000)
		} else {
			timer = setTimeout(() => setCurrentItem(currentItem + 1), 3000)
		}

		return () => clearTimeout(timer) // Shen comp unmounted
	}, [currentItem])

	return (
		<PostPresenter
			location={location}
			caption={caption}
			createdAt={createdAt}
			user={user}
			files={files}
			///////////////////////
			comments={comments}
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
