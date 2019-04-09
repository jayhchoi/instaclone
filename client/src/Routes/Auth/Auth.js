import React, { useState } from 'react'
import AuthPresenter, { LoginPresenter, SignupPresenter } from './AuthPresenter'
import useInput from '../../Hooks/useInput'
import { useMutation } from 'react-apollo-hooks'
import { REQUEST_SECRET, CREATE_USER } from './AuthQueries'
import { toast } from 'react-toastify'

const Login = ({ setShowLogin }) => {
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
        toast.error(
          `Request for secret failed! Try with another email address or sign up!`
        )
        setTimeout(() => setShowLogin(false), 3000)
      } else {
        toast.success(`Secret has been sent to '${user.email}'`)
      }
    } else {
      toast.error('Email field is required!')
    }
  }

  return (
    <LoginPresenter
      email={email}
      setShowLogin={setShowLogin}
      onLogin={onLogin}
    />
  )
}

const Signup = ({ setShowLogin }) => {
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
        setShowLogin(true)
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
      setShowLogin={setShowLogin}
      onSignup={onSignup}
    />
  )
}

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <AuthPresenter>
      {showLogin ? (
        <Login setShowLogin={setShowLogin} />
      ) : (
        <Signup setShowLogin={setShowLogin} />
      )}
    </AuthPresenter>
  )
}

export default Auth
