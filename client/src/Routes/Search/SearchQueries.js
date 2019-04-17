import { gql } from 'apollo-boost'

export const SEARCH = gql`
  query search($query: String!) {
    posts(query: $query) {
      files {
        url
      }
      likeCount
    }
    users(query: $query) {
      username
      avatar
      isFollowed
      isMe
    }
  }
`
