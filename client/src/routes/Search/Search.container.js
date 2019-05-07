import React from 'react'
import { useQuery } from 'react-apollo-hooks'

import Search from './Search.component'
import { SEARCH } from '../../queries/post'

export default function({ location: { search } }) {
	const query = search.split('=')[1]
	const { data, loading } = useQuery(SEARCH, {
		skip: query === undefined,
		variables: {
			query
		}
	})
	return <Search query={query} loading={loading} data={data} />
}
