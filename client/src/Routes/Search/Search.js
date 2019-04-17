import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { withRouter } from 'react-router-dom'
import SearchPresenter from './SearchPresenter'

import { SEARCH } from './SearchQueries'

export default withRouter(({ location: { search } }) => {
  const query = search.split('=')[1]
  const { data, loading } = useQuery(SEARCH, {
    skip: query === undefined,
    variables: {
      query
    }
  })
  return <SearchPresenter query={query} lading={loading} data={data} />
})
