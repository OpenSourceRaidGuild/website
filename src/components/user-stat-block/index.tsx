import React from 'react'
import styled from '@emotion/styled'

import Card from '../card'
import Emoji from '../emoji'

interface Props {
  rank: number | string
  userStats: UserStats
}

const Content = styled.li`
  margin-bottom: 1rem;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 3.75rem 6rem 8.365rem 3fr;
  grid-template-areas: 'rank avatar name stats';

  > p {
    font-size: 2rem;
    opacity: 0.8;
    grid-area: rank;
    align-self: center;
  }
  > img {
    border-radius: 50%;
    width: 6rem;
    height: 6rem;
    grid-area: avatar;
    align-self: center;
  }
  > span {
    grid-area: name;
    align-self: center;
  }
  > div {
    grid-area: stats;
    align-self: center;

    span {
      font-size: 1.25rem;
      margin-right: 1rem;
      opacity: 0.8;
    }
  }
`

export default function UserStatBlock({ rank, userStats }: Props) {
  return (
    <Card>
      <Content>
        <p>#{rank}</p>
        <img src={userStats.avatarUrl} alt={`${userStats.user}'s avatar`} />
        <span>{userStats.user}</span>
        <div>
          <p>
            <Emoji as="⚔️" aria-label="crossing-swords" />+{userStats.additions}
            &emsp;-
            {userStats.deletions}
          </p>
          <p>
            <Emoji as="💾" aria-label="floppy" />
            {userStats.commits}
            {userStats.commits === 1 ? 'Commit' : 'Commits'}
          </p>
        </div>
      </Content>
    </Card>
  )
}
