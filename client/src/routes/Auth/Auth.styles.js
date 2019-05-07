import styled from 'styled-components'

export const Break = styled.div`
	width: 100%;
	margin: 1.5rem 0;
	font-size: 1.2rem;
`

export const BreakLine = styled.div`
	display: inline-block;
	width: 40%;
	height: 1px;
	background-color: ${props => props.theme.color.darkGrey};
	margin-bottom: 0.2rem;
`

export const BreakWord = styled.div`
	text-align: center;
	display: inline-block;
	width: 20%;
`

export const BoxWrapper = styled.div`
	display: flex;
	flex-direction: column;
`
