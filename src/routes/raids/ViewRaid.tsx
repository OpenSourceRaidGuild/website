import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import styled from '@emotion/styled'

import UserStatBlock from '#components/user-stat-block'
import Emoji from '#components/emoji'
import LoadingSpinner from '#components/loading-spinner'
import useDocument from '#utils/useDocument'

const StatsView = styled.main`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
  > * {
    padding: 1rem;
  }
`

const Header = styled.header`
  background-color: white;
  border-bottom: 1px solid hsl(0, 0%, 78%);
  box-shadow: 0 2px 4px 0 hsla(0, 0%, 0%, 10%);
  > section {
    margin: 0 auto;
    max-width: 700px;
  }

  > section > h1 {
    font-size: 2rem;
    line-height: 3rem;
    margin-bottom: 2rem;
  }
`

const TotalStats = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  > p {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    white-space: nowrap;
    > * {
      margin-right: 1rem;
    }
  }

  > :not(:last-child) {
    margin-right: 1rem;
  }
`

const StatContainer = styled.ol`
  overflow-y: auto;
  > * {
    margin: 0 auto;
    margin-top: 1em;
    max-width: 700px;
  }
`

const userStatSorts: {
  [key: string]: (a: UserStats, b: UserStats) => number
} = {
  commits: (a, b) => b.commits - a.commits,
  additions: (a, b) => b.additions - a.additions,
  deletions: (a, b) => b.deletions - a.deletions,
}
const userStatSortNames = Object.keys(userStatSorts)

const ViewRaid = () => {
  const { raidId } = useParams<{ raidId: string }>()
  const { state, data, error } = useDocument<ViewRaidData>('raid-stats', raidId)

  const [currentSort, setCurrentSort] = useState(userStatSortNames[0])

  if (state === 'loading') {
    return <LoadingSpinner />
  } else if (state === 'error') {
    return <p>{JSON.stringify(error)}</p>
  } else if (state === 'not-found') {
    return <p>Couldn`t find that Raid - did you fall into the wrong dungeon?</p>
  } else {
    return (
      <StatsView>
        <Header>
          <section>
            <h1>{data?.title}</h1>
            <TotalStats>
              <p>
                <Emoji as="🚀" aria-label="rocket" />{' '}
                {Object.keys(data?.contributors ?? {}).length} Contributors
              </p>
              <p>
                <Emoji as="💾" aria-label="floppy" /> {data?.commits}{' '}
                {(data?.commits ?? 0) === 1 ? 'Commit' : 'Commits'}
              </p>
              <p>
                <Emoji as="📃" aria-label="file" /> {data?.changedFiles} Changed
                Files
              </p>
              <p>
                <Emoji as="⚔️" aria-label="crossing-swords" /> +
                {data?.additions} -{data?.deletions}
              </p>
              <p>
                <Emoji as="🔥" aria-label="fire" />{' '}
                {(data?.additions ?? 0) - (data?.deletions ?? 0)} Net Deletions
              </p>
            </TotalStats>
            <select
              name="sort"
              id="sort"
              disabled={data ? data.commits <= 1 : false}
              onBlur={(e) => setCurrentSort(e.target.value)}
            >
              {userStatSortNames.map((sortName) => (
                <option key={sortName} value={sortName}>
                  {sortName}
                </option>
              ))}
            </select>
          </section>
        </Header>
        <StatContainer>
          {Object.values(data?.contributors ?? {})
            .sort(userStatSorts[currentSort])
            .map((contributor, index) => (
              <UserStatBlock
                key={contributor.userId}
                rank={index + 1}
                userStats={contributor}
              />
            ))}
        </StatContainer>
      </StatsView>
    )
  }
}

export default ViewRaid
