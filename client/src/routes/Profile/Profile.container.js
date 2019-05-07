import React from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from 'react-apollo-hooks'
import Helmet from 'react-helmet'

import { USER, LOGOUT_USER } from '../../queries/user'
import { PostCard, Loader, Avatar, FatText, Button, FollowButton, Wrapper } from '../../components'

function Profile({
	match: {
		params: { username }
	}
}) {
	const {
		data: { user },
		loading
	} = useQuery(USER, {
		variables: {
			where: {
				username
			}
		}
	})

	const logoutUser = useMutation(LOGOUT_USER)

	if (loading || !user) {
		return (
			<Wrapper>
				<Loader />
			</Wrapper>
		)
	}

	const {
		id,
		bio,
		avatar,
		isMe,
		isFollowed,
		postsCount,
		followersCount,
		followingCount,
		fullName,
		posts
	} = user

	return (
		<Wrapper>
			<Helmet>
				<title>{username} | Prismagram</title>
			</Helmet>
			<Header>
				<HeaderColumn>
					<Avatar size="lg" url={avatar} />
				</HeaderColumn>
				<HeaderColumn>
					<UsernameRow>
						<Username>{username}</Username>{' '}
						{isMe ? (
							<Button onClick={logoutUser}>Logout</Button>
						) : (
							<FollowButton isFollowed={isFollowed} followingId={id} />
						)}
					</UsernameRow>
					<Counts>
						<Count>
							<FatText>{postsCount} posts</FatText>
						</Count>
						<Count>
							<FatText>{followersCount} followers</FatText>
						</Count>
						<Count>
							<FatText>{followingCount} following</FatText>
						</Count>
					</Counts>
					<FullName>{fullName}</FullName>
					<Bio>{bio}</Bio>
				</HeaderColumn>
			</Header>
			<Posts>{posts && posts.map(post => <PostCard key={post.id} post={post} />)}</Posts>
		</Wrapper>
	)
}

const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 80%;
	margin: 0 auto;
	margin-bottom: 40px;
`

const HeaderColumn = styled.div``

const UsernameRow = styled.div`
	display: flex;
	align-items: center;
`

const Username = styled.span`
	font-size: 26px;
	display: block;
	padding-right: 2rem;
`

const Counts = styled.ul`
	display: flex;
	margin: 15px 0px;
`

const Count = styled.li`
	font-size: 16px;
	&:not(:last-child) {
		margin-right: 10px;
	}
`

const FullName = styled(FatText)`
	font-size: 16px;
`

const Bio = styled.p`
	margin: 10px 0px;
`

const Posts = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 200px);
	grid-template-rows: 200px;
	grid-auto-rows: 200px;
`

export default Profile
