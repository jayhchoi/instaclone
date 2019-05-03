import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import Loader from '../Components/Loader'
import Post from '../Components/Post/Post'

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 70vh;
`

const POST = gql`
	query Post($postId: ID!) {
		post(postId: $postId) {
			id
			location
			caption
			createdAt
			likesCount
			isLiked
			user {
				id
				avatar
				username
			}
			files {
				id
				url
			}
			comments {
				id
				text
				user {
					id
					username
				}
			}
		}
	}
`

export default ({
	match: {
		params: { postId }
	}
}) => {
	const {
		data: { post },
		loading
	} = useQuery(POST, {
		variables: {
			postId
		}
	})

	if (loading || (post && Object.keys(post).length === 0))
		return (
			<Wrapper>
				<Loader />
			</Wrapper>
		)

	return (
		<Wrapper>
			<Post
				key={post.id}
				id={post.id}
				location={post.location}
				caption={post.caption}
				createdAt={post.createdAt}
				likesCount={post.likesCount}
				isLiked={post.isLiked}
				user={post.user}
				files={post.files}
				comments={post.comments}
			/>
		</Wrapper>
	)
}
