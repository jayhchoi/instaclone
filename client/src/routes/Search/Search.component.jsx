import React from 'react'
import PropTypes from 'prop-types'

import { Text } from '../../styledComponents'
import { Loader, UserCard, PostCard } from '../../components'

import { SearchPage, UserSection, PostSection } from './Search.styles'

function Search({ query, loading, data }) {
	if (!query) {
		return (
			<SearchPage>
				<Text fat>Search for something</Text>
			</SearchPage>
		)
	}

	if (loading || Object.keys(data).length === 0) {
		return (
			<SearchPage>
				<Loader />
			</SearchPage>
		)
	}

	return (
		<SearchPage>
			<UserSection>
				{data.users.length === 0 ? (
					<Text fat>No user found</Text>
				) : (
					data.users.map(user => <UserCard key={user.id} user={user} />)
				)}
			</UserSection>
			<PostSection>
				{data.posts.length === 0 ? (
					<Text fat>No post found</Text>
				) : (
					data.posts.map(post => {
						return <PostCard key={post.id} post={post} />
					})
				)}
			</PostSection>
		</SearchPage>
	)
}

Search.propTypes = {
	query: PropTypes.string,
	loading: PropTypes.bool,
	data: PropTypes.object
}

export default Search
