import React from 'react'
import PropTypes from 'prop-types'
import useInput from '../../../hooks/useInput'
import { useMutation } from 'react-apollo-hooks'
import { toast } from 'react-toastify'

import Signup from './Signup.component'
import { CREATE_USER } from '../../../queries/user'

const SignupContainer = ({ setDisplay }) => {
	const emailInput = useInput({
		name: 'email',
		placeholder: '이메일 주소',
		type: 'email'
	})

	const usernameInput = useInput({
		name: 'username',
		placeholder: '아이디'
	})

	const firstNameInput = useInput({
		name: 'firstName',
		placeholder: '이름'
	})

	const lastNameInput = useInput({
		name: 'lastName',
		placeholder: '성'
	})

	const createUserInput = {
		username: usernameInput.value,
		email: emailInput.value,
		firstName: firstNameInput.value,
		lastName: lastNameInput.value
	}

	const createUser = useMutation(CREATE_USER, {
		variables: { data: createUserInput }
	})

	const onSignup = async e => {
		e.preventDefault()

		if (
			emailInput.value !== '' &&
			usernameInput.value !== '' &&
			firstNameInput.value !== '' &&
			lastNameInput.value !== ''
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
		<Signup
			emailInput={emailInput}
			usernameInput={usernameInput}
			firstNameInput={firstNameInput}
			lastNameInput={lastNameInput}
			setDisplay={setDisplay}
			onSignup={onSignup}
		/>
	)
}

SignupContainer.propTypes = {
	setDisplay: PropTypes.func.isRequired
}

export default SignupContainer
