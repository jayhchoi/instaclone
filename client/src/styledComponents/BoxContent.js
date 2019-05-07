import styled from 'styled-components'

export default styled.div`
	${props => props.textAlign && `text-align: ${props.textAlign};`}
	padding: 1rem;
`
