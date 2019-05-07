import styled from 'styled-components'
import { Page } from '../../styledComponents'

export const SearchPage = styled(Page)`
	flex-direction: column;
`

export const UserSection = styled.div`
	margin-bottom: 5rem;
	display: grid;
	grid-gap: 2.5rem;
	grid-template-columns: repeat(4, 16rem);
	grid-template-rows: 16rem;
	grid-auto-rows: 16rem;
`

export const PostSection = styled(UserSection)`
	grid-template-columns: repeat(4, 20rem);
	grid-template-rows: 20rem;
	grid-auto-rows: 20rem;
`
