import React from 'react'
import PropTypes from 'prop-types'

import useInput from '../../../hooks/useInput'
import { useMutation } from 'react-apollo-hooks'
import { toast } from 'react-toastify'
import Login from './Login.component'
import { REQUEST_SECRET } from '../../../queries/user'

const LoginContainer = ({ setDisplay, setEmail }) => {
	const emailInput = useInput({
		name: 'email',
		placeholder: '이메일 주소',
		type: 'email'
	})

	const requestSecret = useMutation(REQUEST_SECRET, {
		variables: { email: emailInput.value }
	})

	const onLogin = async e => {
		e.preventDefault()

		if (emailInput.value !== '') {
			const { data } = await requestSecret()
			const { mailSent, user } = data.requestSecret

			if (!mailSent) {
				toast.error(`Request for secret failed! Try with another email address or sign up!`)
				setTimeout(() => setDisplay('SIGNUP'), 3000)
			} else {
				toast.success(`Secret has been sent to '${user.email}'`)
				setTimeout(() => {
					setEmail(emailInput.value)
					setDisplay('CONFIRM')
				}, 1000)
			}
		} else {
			toast.error('Email field is required!')
		}
	}

	return <Login emailInput={emailInput} setDisplay={setDisplay} onLogin={onLogin} />
}

LoginContainer.propTypes = {
	setDisplay: PropTypes.func.isRequired,
	setEmail: PropTypes.func.isRequired
}

export default LoginContainer
