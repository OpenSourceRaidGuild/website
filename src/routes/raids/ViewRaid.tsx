import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import styled from '@emotion/styled'

import UserStatBlock from '#components/user-stat-block'
import Emoji from '#components/emoji'
import LoadingSpinner from '#components/loading-spinner'
import useDocument from '#utils/useDocument'

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
      <$StatsView>
        <$Header>
          <section>
            <h1>{data?.title}</h1>
            <$TotalStats>
              <li>
                <Emoji as="🚀" aria-label="rocket" />{' '}
                {Object.keys(data?.contributors ?? {}).length} Contributors
              </li>
              <li>
                <Emoji as="💾" aria-label="floppy" /> {data?.commits}{' '}
                {(data?.commits ?? 0) === 1 ? 'Commit' : 'Commits'}
              </li>
              <li>
                <Emoji as="📃" aria-label="file" /> {data?.changedFiles} Changed
                Files
              </li>
              <li>
                <Emoji as="⚔️" aria-label="crossing-swords" /> +
                {data?.additions} -{data?.deletions}
              </li>
              <li>
                <Emoji as="🔥" aria-label="fire" />{' '}
                {(data?.additions ?? 0) - (data?.deletions ?? 0)} Net Deletions
              </li>
            </$TotalStats>
            <select
              name="sort"
              id="sort"
              disabled={data ? data.commits <= 1 : false}
              onChange={(e) => setCurrentSort(e.target.value)}
            >
              {userStatSortNames.map((sortName) => (
                <option key={sortName} value={sortName}>
                  {sortName}
                </option>
              ))}
            </select>
          </section>
        </$Header>
        <$StatContainer>
          {Object.values(data?.contributors ?? {})
            .sort(userStatSorts[currentSort])
            .map((contributor, index) => (
              <UserStatBlock
                key={contributor.userId}
                rank={index + 1}
                userStats={contributor}
              />
            ))}
        </$StatContainer>
      </$StatsView>
    )
  }
}

export default ViewRaid

const $StatsView = styled.main`
  --max-content-width: 700px;
  > * {
    padding: var(--space-4);
  }
`

const $Header = styled.header`
  position: sticky;
  top: 0;
  background-color: var(--white);
  border-bottom: 1px solid var(--line-color);
  box-shadow: 0 2px 4px 0 var(--elevation-1);
  z-index: 1;
  section {
    max-width: var(--max-content-width);
    margin: 0 auto;
  }

  h1 {
    font-size: var(--h2);
    margin-bottom: var(--space-3);
  }
`

const $TotalStats = styled.ul`
  list-style-type: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: auto;
  gap: var(--space-2) var(--space-4);
  margin-bottom: var(--space-3);
`

const $StatContainer = styled.ol`
  display: grid;
  grid-auto-rows: auto;
  gap: var(--space-3);
  max-width: var(--max-content-width);
  margin: 0 auto;
`
