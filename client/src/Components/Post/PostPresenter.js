import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import TextareaAutosize from 'react-autosize-textarea'
import Moment from 'react-moment'
import FatText from '../FatText'
import Avatar from '../Avatar'
import { HeartFull, HeartEmpty, Comment as CommentIcon } from '../Icons'

const Post = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  max-width: 60rem;
  /* What is this??? */
  user-select: none;
  margin-bottom: 25px;
  a {
    color: inherit;
  }
`

const Header = styled.header`
  padding: 1.5rem;
  display: flex;
  align-items: center;
`

const UserColumn = styled.div`
  margin-left: 1rem;
`

const Location = styled.span`
  display: block;
  margin-top: 0.5rem;
  font-size: 1.2rem;
`

const Files = styled.div`
  position: relative;
  /* What is padding-bottom 100%??? */
  /* padding-bottom: 100%; */
  height: 60rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`

const File = styled.div`
  max-width: 100%;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-image: url(${props => props.src}});
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`

const Button = styled.span`
  cursor: pointer;
`

const Meta = styled.div`
  padding: 15px;
`

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 1.2rem;
  margin: 1rem 0;
  padding-bottom: 1rem;
  border-bottom: ${props => props.theme.lightGreyColor} 1px solid;
`

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 1.4rem;
  &:focus {
    outline: none;
  }
`

const Comments = styled.ul`
  margin-top: 1rem;
`

const Comment = styled.li`
  margin-bottom: 0.7rem;
  span {
    margin-right: 0.5rem;
  }
`

const Caption = styled.div`
  margin: 1rem 0;
`

const PostPresenter = ({
  location,
  caption,
  createdAt,
  likeCount,
  isLiked,
  user: { username, avatar },
  files,
  comments,
  commentInput,
  currentItem,
  onHeartClick,
  onCommentEnter
}) => {
  return (
    <Post>
      <Header>
        {avatar ? <Avatar size="sm" url={avatar} /> : <Avatar size="sm" />}
        <UserColumn>
          <Link to={`/${username}`}>
            <FatText text={username} />
          </Link>
          <Location>{location}</Location>
        </UserColumn>
      </Header>
      <Files>
        {files.length !== 0 &&
          files.map((file, index) => (
            <File
              key={file.id}
              src={file.url}
              showing={index === currentItem}
            />
          ))}
      </Files>
      <Meta>
        <Buttons>
          <Button onClick={onHeartClick}>
            {isLiked ? <HeartFull /> : <HeartEmpty />}
          </Button>
          <Button>
            <CommentIcon />
          </Button>
        </Buttons>
        <FatText text={likeCount === 1 ? '1 like' : `${likeCount} likes`} />
        <Caption>
          <FatText text={username} /> {caption}
        </Caption>
        {comments && comments.length > 0 && (
          <Comments>
            {comments.map(comment => (
              <Comment key={comment.id}>
                <FatText text={comment.user.username} />
                {comment.text}
              </Comment>
            ))}
          </Comments>
        )}
        <Timestamp>
          <Moment format="MM월 DD일 HH:mm">{createdAt}</Moment>
        </Timestamp>
        <Textarea
          onKeyPress={onCommentEnter}
          placeholder={commentInput.placeholder}
          value={commentInput.value}
          onChange={commentInput.onChange}
        />
      </Meta>
    </Post>
  )
}

export default PostPresenter
