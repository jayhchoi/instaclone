import React from 'react'
import PropTypes from 'prop-types'

import { Input } from '../../../components'
import {
	Box,
	Wordmark,
	BoxContent,
	Button,
	TextLink,
	Text,
	TextBox
} from '../../../styledComponents'
import { BoxWrapper, Break, BreakLine, BreakWord } from '../Auth.styles'

const Confirm = ({ setDisplay, onConfirm, secretInput }) => (
	<BoxWrapper>
		<Box>
			<Wordmark />
			<BoxContent>
				<form onSubmit={onConfirm}>
					<Input {...secretInput} />
					<Button>확인</Button>
				</form>
				<Break>
					<BreakLine />
					<BreakWord>또는</BreakWord>
					<BreakLine />
				</Break>
				<TextBox textAlign="center">
					<TextLink to="/">비밀번호를 잊으셨나요?</TextLink>
				</TextBox>
			</BoxContent>
		</Box>
		<Box>
			<BoxContent textAlign="center">
				<Text color="grey">계정이 없으신가요?</Text>
				<TextLink fat as="button" onClick={() => setDisplay('SIGNUP')}>
					가입하기
				</TextLink>
			</BoxContent>
		</Box>
	</BoxWrapper>
)

Confirm.propTypes = {
	setDisplay: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
	secretInput: PropTypes.object.isRequired
}

export default Confirm
