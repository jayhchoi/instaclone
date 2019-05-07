import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from 'react-apollo-hooks'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TextareaAutosize from 'react-autosize-textarea'
import Moment from 'react-moment'

import FatText from '../styledComponents/Text'
import Avatar from './Avatar'
import { HeartFull, HeartEmpty } from './Icons'
import useInput from './../hooks/useInput'
import FollowButton from './FollowButton'
import { TOGGLE_LIKE, CREATE_COMMENT } from './../queries/post'
import { FEEDS, POST } from './../queries/post'

const PostDetail = ({
	post: {
		id,
		location,
		caption,
		createdAt,
		likesCount,
		isLiked,
		files,
		comments,
		user: { id: userId, avatar, username, isFollowed, isMe }
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
			const { post } = cache.readQuery({
				query: POST,
				variables: {
					postId: id
				}
			})

			post.isLiked = isLiked
			if (isLiked) post.likesCount++
			if (!isLiked) post.liksCount--

			cache.writeQuery({
				query: POST,
				variables: {
					postId: id
				},
				data: {
					post
				}
			})
		}
	})

	const createCommentMutation = useMutation(CREATE_COMMENT, {
		variables: { postId: id, text: commentInput.value },
		update: (cache, { data: { createComment: newComment } }) => {
			const { post } = cache.readQuery({
				query: POST,
				variables: {
					postId: id
				}
			})

			post.comments.push(newComment)

			cache.writeQuery({
				query: POST,
				variables: {
					postId: id
				},
				data: {
					post
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
		<PostContainer>
			<PhotoColumn>
				<Files>
					{files.length !== 0 &&
						files.map((file, index) => (
							<File key={file.id} src={file.url} showing={index === currentItem} />
						))}
				</Files>
			</PhotoColumn>
			<MetaColumn>
				<Header>
					<UserColumn>
						<AvatarWrapper>
							<Avatar size="sm" url={avatar} />
						</AvatarWrapper>
						<TextWrapper>
							<Link to={`/profile/${username}`}>
								<FatText>{username}</FatText>
							</Link>
							<Location>{location || 'Seoul, S.Korea'}</Location>
						</TextWrapper>
					</UserColumn>
					{!isMe && (
						<FollowColumn>
							<FollowButton isFollowed={isFollowed} followingId={userId} />
						</FollowColumn>
					)}
				</Header>
				<MetaOne>
					<Caption>
						<FatText>{username}</FatText> {caption}
					</Caption>
					{comments && comments.length > 0 && (
						<Comments>
							{comments.map(comment => (
								<Comment key={comment.id}>
									<CommentHeader>
										<Avatar size="sm" url={avatar} />
									</CommentHeader>
									<CommentBody>
										<Link to={`/profile/${comment.user.username}`}>
											<FatText>{comment.user.username}</FatText>
										</Link>
										<CommentText>{comment.text}</CommentText>
									</CommentBody>
								</Comment>
							))}
						</Comments>
					)}
				</MetaOne>
				<MetaTwo>
					<Buttons>
						<Button onClick={onHeartClick}>{isLikedState ? <HeartFull /> : <HeartEmpty />}</Button>
					</Buttons>
					<FatText>{likesCountState === 1 ? '1 like' : `${likesCountState} likes`}</FatText>

					<Timestamp>
						<Moment fromNow>{createdAt}</Moment>
					</Timestamp>
				</MetaTwo>
				<MetaThree>
					<Textarea
						onKeyPress={onCommentEnter}
						placeholder={commentInput.placeholder}
						value={commentInput.value}
						onChange={commentInput.onChange}
					/>
				</MetaThree>
			</MetaColumn>
		</PostContainer>
	)
}

PostDetail.propTypes = {
	post: PropTypes.shape({
		id: PropTypes.string.isRequired,
		location: PropTypes.string,
		caption: PropTypes.string.isRequired,
		createdAt: PropTypes.string.isRequired,
		likesCount: PropTypes.number.isRequired,
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

const PostContainer = styled.div`
	display: flex;
	${props => props.theme.preset.whiteBox};
	width: 100%;
	/* What is this??? */
	user-select: none;
	margin-bottom: 25px;
	max-height: 60rem;
`

const PhotoColumn = styled.div`
	width: 60%;
`

const MetaColumn = styled.div`
	width: 40%;
`

const Header = styled.header`
	padding: 1.5rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: ${({ theme }) => theme.preset.boxBorder};

	a {
		color: inherit;
	}
`

const UserColumn = styled.div`
	margin-left: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
`

const AvatarWrapper = styled.div`
	margin-right: 1rem;
`

const TextWrapper = styled.div``

const FollowColumn = styled.div``

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

const MetaOne = styled.div`
	max-height: 63%;
	overflow: auto;
	padding: 1rem;
	border-bottom: ${({ theme }) => theme.preset.boxBorder};
`

const MetaTwo = styled.div`
	padding: 1rem;
	border-bottom: ${({ theme }) => theme.preset.boxBorder};
`

const MetaThree = styled.div`
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

const Timestamp = styled.span`
	font-weight: 400;
	text-transform: uppercase;
	opacity: 0.5;
	display: block;
	font-size: 1.2rem;
	margin: 1rem 0;
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
	padding: 0.5rem;
	display: flex;
	align-items: center;

	a {
		color: inherit;
	}
`

const CommentHeader = styled.div`
	width: 15%;
	display: flex;
	justify-content: center;
`

const CommentBody = styled.div`
	width: 85%;
`

const CommentText = styled.span`
	margin-left: 1rem;
	word-wrap: break-word;
`

const Caption = styled.div`
	margin: 1rem 0;
`

export default PostDetail
