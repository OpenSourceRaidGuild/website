import React from 'react'
import styled from '@emotion/styled'

import Card from '../card'
import Emoji from '../emoji'

interface Props {
  rank: number | string
  userStats: UserStats
}

export default function UserStatBlock({ rank, userStats }: Props) {
  return (
    <Card>
      <$Content>
        <$Rank>#{rank}</$Rank>
        <$User>
          <img src={userStats.avatarUrl} alt={`${userStats.user}'s avatar`} />
          <span>{userStats.user}</span>
        </$User>
        <$Stats>
          <div>
            <Emoji as="⚔️" aria-label="crossing-swords" />+{userStats.additions}
            &emsp;-
            {userStats.deletions}
          </div>
          <div>
            <Emoji as="💾" aria-label="floppy" />
            {userStats.commits} {userStats.commits === 1 ? 'Commit' : 'Commits'}
          </div>
        </$Stats>
      </$Content>
    </Card>
  )
}

const $Content = styled.li`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: var(--space-6) 1fr 1fr;
  grid-template-areas: 'rank user stats';
  align-items: center;
`

const $Rank = styled.span`
  font-size: var(--h3);
  opacity: 0.8;
  grid-area: rank;
`

const $User = styled.div`
  grid-area: user;
  display: flex;
  align-items: inherit;
  img {
    border-radius: 50%;
    width: 6rem;
    height: 6rem;
    margin-right: var(--space-5);
  }
`

const $Stats = styled.div`
  grid-area: stats;
  display: grid;
  gap: var(--space-3);

  span {
    font-size: var(--h5);
    margin-right: var(--space-3);
    opacity: 0.8;
  }
`
