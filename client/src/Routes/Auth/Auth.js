import React, { useState } from 'react'

import Confirm from './Confirm/Confirm.container'
import Signup from './Signup/Signup.container'
import Login from './Login/Login.container'

const Auth = () => {
	const [display, setDisplay] = useState('LOGIN')
	const [email, setEmail] = useState('')

	return (
		<>
			{display === 'LOGIN' ? (
				<Login setDisplay={setDisplay} setEmail={setEmail} />
			) : display === 'SIGNUP' ? (
				<Signup setDisplay={setDisplay} />
			) : (
				<Confirm setDisplay={setDisplay} email={email} />
			)}
		</>
	)
}

export default Auth
