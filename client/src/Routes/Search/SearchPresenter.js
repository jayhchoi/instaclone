import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import FatText from '../../Components/FatText'

const Wrapper = styled.div`
  height: 50vh;
  text-align: center;
`

const SearchPresenter = ({ query, loading, data }) => (
  <Wrapper>{!query && <FatText text={'Search for something'} />}</Wrapper>
)

SearchPresenter.propTypes = {
  query: PropTypes.string,
  loading: PropTypes.bool
}

export default SearchPresenter
