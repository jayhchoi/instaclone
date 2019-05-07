import React from 'react'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import Input from './Input'
import useInput from '../hooks/useInput'
import { useQuery } from 'react-apollo-hooks'
import { Compass, HeartEmpty, User, Logo } from './Icons'
import { gql } from 'apollo-boost'
import wordmark from '../assets/images/instagram_wordmark.png'

export const ME = gql`
	{
		me {
			username
		}
	}
`

const StyledHeader = styled.header`
	width: 100%;
	height: ${({ theme }) => theme.size.navHeight};
	border: 0;
	position: fixed;
	top: 0;
	left: 0;
	background-color: white;
	border-bottom: ${props => props.theme.preset.boxBorder};
	border-radius: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 2rem 3rem;
	z-index: 2;
`

const HeaderWrapper = styled.div`
	width: 100%;
	max-width: ${props => props.theme.size.maxWidth};
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

const Divider = styled.div`
	display: inline-block;
	background-color: ${({ theme }) => theme.color.black};
	height: 2.7rem;
	margin: 0 1.6rem;
	width: 1px;
`

const Wordmark = styled.div`
	display: inline-block;
	margin-bottom: -0.5rem;
	height: 2.7rem;
	width: 10rem;
	background-image: url(${wordmark});
	background-position: center;
	background-repeat: no-repeat;
	background-size: 100% auto;
`

const SearchInput = styled(Input)`
	background-color: ${props => props.theme.color.grey};
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
	const search = useInput({ name: 'query', placeholder: 'Search' })
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
						<Divider />
						<Wordmark />
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
						<HeaderLink to={`/profile/${me.username}`}>
							<User />
						</HeaderLink>
					)}
				</HeaderColumn>
			</HeaderWrapper>
		</StyledHeader>
	)
}

export default withRouter(Header)
