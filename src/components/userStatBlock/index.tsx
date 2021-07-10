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
          <a
            href={`https://www.github.com/${userStats.user}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={userStats.avatarUrl} alt={`${userStats.user}'s avatar`} />
          </a>
          <a
            href={`https://www.github.com/${userStats.user}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {userStats.user}
          </a>
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

const $Content = styled('li')`
  display: grid;
  gap: var(--space-5);
  grid-template-columns: var(--space-6) 1fr 1fr;
  grid-template-areas: 'rank user stats';
  align-items: center;
  @media screen and (max-width: 1024px) {
    grid-template-columns: min-content 1fr;
    grid-template-areas: 'rank user' 'rank stats';
    justify-content: center;
    row-gap: var(--space-4);
    column-gap: 0;
  }
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`

const $Rank = styled('span')`
  font-size: var(--h3);
  opacity: 0.8;
  grid-area: rank;
`

const $User = styled('div')`
  grid-area: user;
  display: flex;
  align-items: inherit;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
  img {
    border-radius: 50%;
    width: 6rem;
    height: 6rem;
    @media screen and (min-width: 1025px) {
      margin-right: var(--space-5);
    }
    @media screen and (max-width: 1024px) {
      width: 4rem;
      height: 4rem;
    }
  }
`

const $Stats = styled('div')`
  grid-area: stats;
  display: grid;
  gap: var(--space-3);
  @media screen and (max-width: 1024px) {
    justify-content: center;
  }

  span {
    font-size: var(--h5);
    margin-right: var(--space-3);
    opacity: 0.8;
  }
`
