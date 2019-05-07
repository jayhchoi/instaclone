import styled from 'styled-components'

export default styled.div`
	background-color: white;
	width: ${props => props.width || '35rem'};
	border: ${props => props.theme.preset.boxBorder};
	border-radius: ${props => props.theme.size.borderRadius};
	padding: 2rem 3rem;

	&:not(:last-child) {
		margin-bottom: 1rem;
	}
`
