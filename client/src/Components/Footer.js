import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledFooter = styled.footer`
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-transform: uppercase;
	font-weight: 600;
	font-size: 1.2rem;
	margin: 5rem 0px;
`

const List = styled.ul`
	display: flex;
`

const ListItem = styled.li`
	&:not(:last-child) {
		margin-right: 1.6rem;
	}
`

const StyledLink = styled(Link)`
	color: ${props => props.theme.color.darkBlue};
`

const Copyright = styled.span`
	color: ${props => props.theme.color.darkGrey};
`

const Footer = () => (
	<StyledFooter>
		<List>
			<ListItem>
				<StyledLink to="#">about us</StyledLink>
			</ListItem>
			<ListItem>
				<StyledLink to="#">support</StyledLink>
			</ListItem>
			<ListItem>
				<StyledLink to="#">press</StyledLink>
			</ListItem>
			<ListItem>
				<StyledLink to="#">api</StyledLink>
			</ListItem>
			<ListItem>
				<StyledLink to="#">jobs</StyledLink>
			</ListItem>
			<ListItem>
				<StyledLink to="#">privacy</StyledLink>
			</ListItem>
			<ListItem>
				<StyledLink to="#">terms</StyledLink>
			</ListItem>
			<ListItem>
				<StyledLink to="#">directory</StyledLink>
			</ListItem>
			<ListItem>
				<StyledLink to="#">profiles</StyledLink>
			</ListItem>
			<ListItem>
				<StyledLink to="#">hashtags</StyledLink>
			</ListItem>
			<ListItem>
				<StyledLink to="#">language</StyledLink>
			</ListItem>
		</List>
		<Copyright>Instaclone {new Date().getFullYear()} &copy;</Copyright>
	</StyledFooter>
)

export default Footer
