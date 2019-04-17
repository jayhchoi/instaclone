import { gql } from 'apollo-boost'

export const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: ID!) {
    toggleLike(postId: $postId)
  }
`

export const CREATE_COMMENT = gql`
  mutation createComment($postId: ID!, $text: String!) {
    createComment(postId: $postId, text: $text) {
      id
      text
      user {
        id
        username
      }
    }
  }
`
