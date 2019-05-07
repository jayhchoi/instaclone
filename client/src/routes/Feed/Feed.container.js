import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import Loader from '../../components/Loader'
import Post from '../../components/Post/Post'
import { FEEDS } from '../../queries/post'

const Feed = () => {
	const {
		data: { posts },
		loading,
		error
	} = useQuery(FEEDS)

	if (loading)
		return (
			<Wrapper>
				<Loader />
			</Wrapper>
		)

	if (error) return <div>{error.message}</div>

	if (!loading && posts)
		return (
			<Wrapper>
				{posts.map(post => (
					<Post key={post.id} post={post} />
				))}
			</Wrapper>
		)
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 70vh;
`

export default Feed
