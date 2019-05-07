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

const Login = ({ setDisplay, onLogin, emailInput }) => (
	<BoxWrapper>
		<Box>
			<Wordmark />
			<BoxContent>
				<form onSubmit={onLogin}>
					<Input {...emailInput} />
					<Button>로그인</Button>
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

Login.propTypes = {
	setDisplay: PropTypes.func.isRequired,
	onLogin: PropTypes.func.isRequired,
	emailInput: PropTypes.object.isRequired
}

export default Login
