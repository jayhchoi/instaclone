import { gql } from 'apollo-boost'

export const SEARCH = gql`
  query search($query: String!) {
    posts(query: $query) {
      id
      files {
        url
      }
      likeCount
      commentCount
    }
    users(query: $query) {
      id
      username
      avatar
      isFollowed
      isMe
    }
  }
`
