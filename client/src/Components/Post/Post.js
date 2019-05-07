import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from 'react-apollo-hooks'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TextareaAutosize from 'react-autosize-textarea'
import Moment from 'react-moment'

import FatText from '../../styledComponents/Text'
import Avatar from '../Avatar'
import { HeartFull, HeartEmpty, Comment as CommentIcon } from '../Icons'
import useInput from '../../hooks/useInput'
import { TOGGLE_LIKE, CREATE_COMMENT } from '../../queries/post'
import { FEEDS } from '../../queries/post'

const Post = ({
	post: {
		id,
		location,
		caption,
		createdAt,
		likesCount,
		commentsCount,
		isLiked,
		files,
		comments,
		user: { avatar, username }
	}
}) => {
	// STATES
	const [isLikedState, setIsLikedState] = useState(isLiked)
	const [likesCountState, setlikesCountState] = useState(likesCount)
	const [currentItem, setCurrentItem] = useState(0)

	// INPUTS
	const commentInput = useInput({
		name: 'comment',
		placeholder: 'Add a comment...'
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
						p.likesCount++
					} else {
						p.likesCount--
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
		setlikesCountState(!isLikedState ? likesCountState + 1 : likesCountState - 1)
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
		const numOfFiles = files.length
		let timer
		if (currentItem === numOfFiles - 1) {
			timer = setTimeout(() => setCurrentItem(0), 3000)
		} else {
			timer = setTimeout(() => setCurrentItem(currentItem + 1), 3000)
		}

		return () => clearTimeout(timer) // Shen comp unmounted
	}, [currentItem])

	return (
		<StyledPost>
			<Header>
				<Avatar size="sm" url={avatar} />
				<UserColumn>
					<Link to={`/profile/${username}`}>
						<FatText>{username}</FatText>
					</Link>
					<Location>{location || 'Seoul, S.Korea'}</Location>
				</UserColumn>
			</Header>
			<Files>
				{files.length !== 0 &&
					files.map((file, index) => (
						<File key={file.id} src={file.url} showing={index === currentItem} />
					))}
			</Files>
			<Meta>
				<Buttons>
					<Button onClick={onHeartClick}>{isLikedState ? <HeartFull /> : <HeartEmpty />}</Button>
					<Button>
						<Link to={`post/${id}`}>
							<CommentIcon />
						</Link>
					</Button>
				</Buttons>
				<FatText>{likesCountState === 1 ? '1 like' : `${likesCountState} likes`}</FatText>
				<Caption>
					<FatText>{username}</FatText> {caption}
				</Caption>
				{comments && comments.length > 0 && (
					<>
						{comments.length > 3 && (
							<ViewAll to={`/post/${id}`}>{`View all ${commentsCount} comments...`}</ViewAll>
						)}
						<Comments>
							{comments.slice(-3).map(comment => (
								<Comment key={comment.id}>
									<FatText>{comment.user.username}</FatText>
									<CommentText>{comment.text}</CommentText>
								</Comment>
							))}
						</Comments>
					</>
				)}
				<Timestamp>
					<Moment fromNow>{createdAt}</Moment>
				</Timestamp>
				<Textarea
					onKeyPress={onCommentEnter}
					placeholder={commentInput.placeholder}
					value={commentInput.value}
					onChange={commentInput.onChange}
				/>
			</Meta>
		</StyledPost>
	)
}

Post.propTypes = {
	post: PropTypes.shape({
		id: PropTypes.string.isRequired,
		location: PropTypes.string,
		caption: PropTypes.string.isRequired,
		createdAt: PropTypes.string.isRequired,
		likesCount: PropTypes.number.isRequired,
		commentsCount: PropTypes.number.isRequired,
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
	}).isRequired
}

const StyledPost = styled.div`
	${props => props.theme.preset.whiteBox};
	width: 100%;
	max-width: 60rem;
	/* What is this??? */
	user-select: none;
	margin-bottom: 25px;
`

const Header = styled.header`
	padding: 1.5rem;
	display: flex;
	align-items: center;

	a {
		color: inherit;
	}
`

const UserColumn = styled.div`
	margin-left: 1rem;
`

const Location = styled.span`
	display: block;
	margin-top: 0.5rem;
	font-size: 1.2rem;
`

const Files = styled.div`
	position: relative;
	/* What is padding-bottom 100%??? */
	/* padding-bottom: 100%; */
	height: 60rem;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	flex-shrink: 0;
`

const File = styled.div`
	max-width: 100%;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	background-image: url(${props => props.src}});
	background-size: cover;
	background-position: center;
	opacity: ${props => (props.showing ? 1 : 0)};
	transition: opacity 0.5s linear;
`

const Button = styled.span`
	cursor: pointer;
`

const Meta = styled.div`
	padding: 15px;
`

const Buttons = styled.div`
	${Button} {
		&:first-child {
			margin-right: 10px;
		}
	}
	margin-bottom: 10px;
`

const CommentText = styled.span`
	margin-left: 1rem;
	word-wrap: break-word;
`

const Timestamp = styled.span`
	font-weight: 400;
	text-transform: uppercase;
	opacity: 0.5;
	display: block;
	font-size: 1.2rem;
	margin: 1rem 0;
	padding-bottom: 1rem;
	border-bottom: ${props => props.theme.color.lightGrey} 1px solid;
`

const ViewAll = styled(Link)`
	color: ${({ theme }) => theme.color.darkGrey};
	font-weight: 600;
`

const Textarea = styled(TextareaAutosize)`
	border: none;
	width: 100%;
	resize: none;
	font-family: inherit;
	&:focus {
		outline: none;
	}
	&::placeholder {
		opacity: 0.8;
	}
`

const Comments = styled.ul`
	margin-top: 1rem;
`

const Comment = styled.li`
	margin-bottom: 0.7rem;
	span {
		margin-right: 0.5rem;
	}
`

const Caption = styled.div`
	margin: 1rem 0;
`

export default Post
