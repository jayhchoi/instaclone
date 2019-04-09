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
