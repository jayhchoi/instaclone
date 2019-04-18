import React from 'react'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import Input from './Input'
import useInput from '../Hooks/useInput'
import { useQuery } from 'react-apollo-hooks'
import { Compass, HeartEmpty, User, Logo } from './Icons'
import { gql } from 'apollo-boost'

export const ME = gql`
  {
    me {
      username
    }
  }
`

const StyledHeader = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: ${props => props.theme.boxBorder};
  border-radius: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5rem 3.5rem;
  z-index: 2;
`

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`

const SearchInput = styled(Input)`
  background-color: ${props => props.theme.greyColor};
  padding: 0.5rem;
  font-size: 1.4rem;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`

const Header = ({ history }) => {
  const search = useInput({ name: 'query', placeholder: '사진을 검색하세요' })
  const {
    data: { me }
  } = useQuery(ME)

  const onSearchSubmit = e => {
    e.preventDefault()
    history.push(`/search?query=${search.value}`)
    search.reset()
  }

  return (
    <StyledHeader>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/">
            <Logo />
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <form onSubmit={onSearchSubmit}>
            <SearchInput
              name={search.name}
              value={search.value}
              onChange={search.onChange}
              placeholder={search.placeholder}
            />
          </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to="/explore">
            <Compass />
          </HeaderLink>
          <HeaderLink to="/notifications">
            <HeartEmpty />
          </HeaderLink>
          {!me ? (
            <HeaderLink to="/#">
              <User />
            </HeaderLink>
          ) : (
            <HeaderLink to={me.username}>
              <User />
            </HeaderLink>
          )}
        </HeaderColumn>
      </HeaderWrapper>
    </StyledHeader>
  )
}

export default withRouter(Header)
