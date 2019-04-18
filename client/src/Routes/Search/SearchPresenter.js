import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import FatText from '../../Components/FatText'
import Loader from '../../Components/Loader'
import UserCard from '../../Components/UserCard'
import PostCard from '../../Components/PostCard'

const Wrapper = styled.div`
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const UserSection = styled.div`
  margin-bottom: 5rem;
  display: grid;
  grid-gap: 2.5rem;
  grid-template-columns: repeat(4, 16rem);
  grid-template-rows: 16rem;
  grid-auto-rows: 16rem;
`

const PostSection = styled(UserSection)`
  grid-template-columns: repeat(4, 20rem);
  grid-template-rows: 20rem;
  grid-auto-rows: 20rem;
`

const SearchPresenter = ({ query, loading, data }) => {
  if (!query) {
    return (
      <Wrapper>
        <FatText text="Search for something." />
      </Wrapper>
    )
  }

  if (loading || Object.keys(data).length === 0) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <UserSection>
        {data.users.length === 0 ? (
          <FatText text={'No user found.'} />
        ) : (
          data.users.map(({ id, username, avatar, isFollowed, isMe }) => (
            <UserCard
              key={id}
              id={id}
              username={username}
              avatar={avatar}
              isFollowed={isFollowed}
              isMe={isMe}
            />
          ))
        )}
      </UserSection>
      <PostSection>
        {data.posts.length === 0 ? (
          <FatText text={'No post found.'} />
        ) : (
          data.posts.map(({ id, files, likeCount, commentCount }) => (
            <PostCard
              key={id}
              id={id}
              file={files[0]}
              likeCount={likeCount}
              commentCount={commentCount}
            />
          ))
        )}
      </PostSection>
    </Wrapper>
  )
}

SearchPresenter.propTypes = {
  query: PropTypes.string,
  loading: PropTypes.bool,
  data: PropTypes.object
}

export default SearchPresenter
