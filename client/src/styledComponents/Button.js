import styled from 'styled-components'

export default styled.button`
	background-color: ${props => props.theme.color.blue};
	color: white;
	display: block;
	width: 100%;
	padding: 1rem 2rem;
	border: none;
	text-decoration: none;
	border-radius: 3px;

	&:hover {
		cursor: pointer;
	}
`
