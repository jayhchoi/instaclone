import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default styled(Link)`
	color: ${props => props.theme.color.black};
	font-size: 1.2rem;
	display: inline-block;
	margin: 0 auto;
	border: none;
	background: none;
	${props => props.fat && `font-weight: ${props.theme.size.fontWeightFat}`}

	&:hover {
		color: ${({ theme }) => theme.color.blue};
		cursor: pointer;
	}

	&:focus {
		outline: none;
	}
`
