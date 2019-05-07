import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import Loader from '../../components/Loader'
import PostDetail from '../../components/PostDetail'
import { POST } from '../../queries/post'

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 70vh;
`

const Post = ({
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
			<PostDetail key={post.id} post={post} />
		</Wrapper>
	)
}

export default Post
