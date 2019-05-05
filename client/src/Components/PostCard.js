import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { HeartFull, CommentFull } from './Icons'

const PostCard = ({ post: { id, files, likesCount, commentsCount } }) => (
	<Container bg={files[0].url}>
		<Link to={`/post/${id}`}>
			<Overlay>
				<Number>
					<HeartFull />
					<NumberText>{likesCount}</NumberText>
				</Number>
				<Number>
					<CommentFull />
					<NumberText>{commentsCount}</NumberText>
				</Number>
			</Overlay>
		</Link>
	</Container>
)

PostCard.propTypes = {
	post: PropTypes.shape({
		likesCount: PropTypes.number.isRequired,
		commentsCount: PropTypes.number.isRequired,
		files: PropTypes.array.isRequired,
		id: PropTypes.string.isRequired
	}).isRequired
}

const Overlay = styled.div`
	background-color: rgba(0, 0, 0, 0.6);
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0;
	transition: opacity 0.3s linear;
	svg {
		fill: white;
	}
`

const Container = styled.div`
	background-image: url(${props => props.bg});
	background-size: cover;
	cursor: pointer;
	&:hover {
		${Overlay} {
			opacity: 1;
		}
	}
`

const Number = styled.div`
	color: white;
	display: flex;
	align-items: center;
	&:first-child {
		margin-right: 3rem;
	}
`

const NumberText = styled.span`
	margin-left: 1rem;
	font-size: 1.6rem;
`

export default PostCard
