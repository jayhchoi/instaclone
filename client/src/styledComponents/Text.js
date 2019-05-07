import styled from 'styled-components'

export default styled.span`
	${props => props.fat && 'font-weight: 600;'}
	${props =>
		(props.color === 'grey' && `color: ${props.theme.color.darkGrey}`) ||
		(props.color === 'blue' && `color: ${props.theme.color.blue}`)}
`
