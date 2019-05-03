import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import Loader from '../Components/Loader'
import Post from '../Components/Post/Post'
import { FEEDS } from '../queries'

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 70vh;
`

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
				))}
			</Wrapper>
		)
}

export default Feed
