import { gql } from 'apollo-boost'

export const REQUEST_SECRET = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email) {
      mailSent
      user {
        email
      }
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($data: CreateUserInput!) {
    createUser(data: $data) {
      created
      user {
        fullName
      }
    }
  }
`

export const LOGIN_USER = gql`
  mutation loginUser($secret: String!, $email: String!) {
    loginUser(secret: $secret, email: $email) {
      token
      user {
        fullName
      }
    }
  }
`

export const AUTHENTICATE_USER = gql`
  mutation authenticateUser($token: String!) {
    authenticateUser(token: $token) @client
  }
`
