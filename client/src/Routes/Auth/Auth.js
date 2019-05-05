import React, { useState } from 'react'
import AuthPresenter, { LoginPresenter, SignupPresenter, ConfirmPresenter } from './AuthPresenter'
import useInput from '../../Hooks/useInput'
import { useMutation } from 'react-apollo-hooks'
import { REQUEST_SECRET, CREATE_USER, LOGIN_USER, AUTHENTICATE_USER } from './AuthQueries'
import { toast } from 'react-toastify'

const Confirm = ({ setDisplay, email }) => {
	const secret = useInput({
		name: 'secret',
		placeholder: '시크릿',
		type: 'password'
	})

	const loginUser = useMutation(LOGIN_USER, {
		variables: { secret: secret.value, email }
	})

	const authenticateUser = useMutation(AUTHENTICATE_USER)

	const onConfirm = async e => {
		e.preventDefault()

		if (secret.value !== '') {
			const { data } = await loginUser()
			const { token, user } = data.loginUser

			if (!token) {
				toast.error(`Confirmation of secret failed, try again!`)
			} else {
				authenticateUser({ variables: { token } })

				toast.success(`Secret has been confirmed, enjoy your ride ${user.fullName}!`)
			}
		} else {
			toast.error('Secret is required!')
		}
	}

	return <ConfirmPresenter secret={secret} setDisplay={setDisplay} onConfirm={onConfirm} />
}

const Login = ({ setDisplay, setEmail }) => {
	const email = useInput({
		name: 'email',
		placeholder: '이메일 주소',
		type: 'email'
	})

	const requestSecret = useMutation(REQUEST_SECRET, {
		variables: { email: email.value }
	})

	const onLogin = async e => {
		e.preventDefault()

		if (email.value !== '') {
			const { data } = await requestSecret()
			const { mailSent, user } = data.requestSecret

			if (!mailSent) {
				toast.error(`Request for secret failed! Try with another email address or sign up!`)
				setTimeout(() => setDisplay('SIGNUP'), 3000)
			} else {
				toast.success(`Secret has been sent to '${user.email}'`)
				setTimeout(() => {
					setEmail(email.value)
					setDisplay('CONFIRM')
				}, 1000)
			}
		} else {
			toast.error('Email field is required!')
		}
	}

	return <LoginPresenter email={email} setDisplay={setDisplay} onLogin={onLogin} />
}

const Signup = ({ setDisplay }) => {
	const email = useInput({
		name: 'email',
		placeholder: '이메일 주소',
		type: 'email'
	})

	const username = useInput({
		name: 'username',
		placeholder: '아이디'
	})

	const firstName = useInput({
		name: 'firstName',
		placeholder: '이름'
	})

	const lastName = useInput({
		name: 'lastName',
		placeholder: '성'
	})

	const createUserInput = {
		username: username.value,
		email: email.value,
		firstName: firstName.value,
		lastName: lastName.value
	}

	const createUser = useMutation(CREATE_USER, {
		variables: { data: createUserInput }
	})

	const onSignup = async e => {
		e.preventDefault()

		if (
			email.value !== '' &&
			username.value !== '' &&
			firstName.value !== '' &&
			lastName.value !== ''
		) {
			const { data } = await createUser()
			const { created, user } = data.createUser

			if (!created) {
				toast.error(`Signup attemp faild! Try again`)
			} else {
				toast.success(`Welcome ${user.fullName}, login now!`)
				setDisplay('LOGIN')
			}
		} else {
			toast.error('All fields are required!')
		}
	}

	return (
		<SignupPresenter
			email={email}
			username={username}
			firstName={firstName}
			lastName={lastName}
			setDisplay={setDisplay}
			onSignup={onSignup}
		/>
	)
}

const Auth = () => {
	const [display, setDisplay] = useState('LOGIN')
	const [email, setEmail] = useState()

	return (
		<AuthPresenter>
			{display === 'LOGIN' ? (
				<Login setDisplay={setDisplay} setEmail={setEmail} />
			) : display === 'SIGNUP' ? (
				<Signup setDisplay={setDisplay} />
			) : (
				<Confirm setDisplay={setDisplay} email={email} />
			)}
		</AuthPresenter>
	)
}

export default Auth
