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
	TextBox,
	H2
} from '../../../styledComponents'
import { BoxWrapper } from '../Auth.styles'

const Signup = ({
	setDisplay,
	emailInput,
	usernameInput,
	firstNameInput,
	lastNameInput,
	onSignup
}) => (
	<BoxWrapper>
		<Box>
			<Wordmark />
			<H2>친구들의 사진과 동영상을 보려면 가입하세요.</H2>
			<BoxContent>
				<form onSubmit={onSignup}>
					<Input {...emailInput} />
					<Input {...firstNameInput} />
					<Input {...lastNameInput} />
					<Input {...usernameInput} />
					<Button>가입</Button>
				</form>
			</BoxContent>
			<TextBox textAlign="center">
				<Text color="grey">
					가입하면 Instagram의 약관, 데이터 정책 및 쿠키 정책에 동의하게 됩니다.
				</Text>
			</TextBox>
		</Box>
		<Box>
			<BoxContent textAlign="center">
				<Text color="grey">계정이 있으신가요?</Text>
				<TextLink as="button" onClick={() => setDisplay('LOGIN')}>
					로그인
				</TextLink>
			</BoxContent>
		</Box>
	</BoxWrapper>
)

Signup.propTypes = {
	setDisplay: PropTypes.func.isRequired,
	emailInput: PropTypes.object.isRequired,
	usernameInput: PropTypes.object.isRequired,
	firstNameInput: PropTypes.object.isRequired,
	lastNameInput: PropTypes.object.isRequired,
	onSignup: PropTypes.func.isRequired
}

export default Signup
