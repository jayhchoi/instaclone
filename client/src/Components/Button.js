import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
	border: none;
	width: 100%;
	background-color: ${props => props.theme.color.blue};
	padding: 1rem 2rem;
	color: white;
	border-radius: ${props => props.theme.size.borderRadius};
	font-weight: 600;
	font-size: 1.4rem;
	cursor: pointer;
	transition: all 0.2s;

	&:hover {
		transform: translateY(0.3rem);
	}

	&:focus {
		outline: none;
		transform: translateY(0);
	}

	&:active {
		transform: translateY(0.5rem);
	}
`

const Button = ({ children, ...rest }) => {
	return <StyledButton {...rest}>{children}</StyledButton>
}

export default Button
