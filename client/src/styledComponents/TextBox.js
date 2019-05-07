import styled from 'styled-components'

export default styled.div`
	padding: 0.5rem 1rem;
	${props => props.textAlign && `text-align: ${props.textAlign};`}
	${props => props.color && `color: ${props.color};`}
`
