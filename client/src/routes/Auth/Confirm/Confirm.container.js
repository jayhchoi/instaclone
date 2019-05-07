import React from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useMutation } from 'react-apollo-hooks'

import useInput from '../../../hooks/useInput'
import { LOGIN_USER, AUTHENTICATE_USER } from '../../../queries/user'
import Confirm from './Confirm.component'

const ConfirmContainer = ({ setDisplay, email }) => {
	const secretInput = useInput({
		name: 'secret',
		placeholder: '시크릿',
		type: 'password'
	})

	const loginUser = useMutation(LOGIN_USER, {
		variables: { secret: secretInput.value, email }
	})

	const authenticateUser = useMutation(AUTHENTICATE_USER)

	const onConfirm = async e => {
		e.preventDefault()

		if (secretInput.value !== '') {
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

	return <Confirm secretInput={secretInput} setDisplay={setDisplay} onConfirm={onConfirm} />
}

ConfirmContainer.propTypes = {
	setDisplay: PropTypes.func.isRequired,
	email: PropTypes.string.isRequired
}

export default ConfirmContainer
