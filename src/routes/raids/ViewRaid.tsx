import { useState } from 'react';
import { useParams } from 'react-router-dom'

import styled from '@emotion/styled'

import UserStatBlock from '#components/userStatBlock'
import Emoji from '#components/emoji'
import LoadingSpinner from '#components/loadingSpinner'
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
  const documentData = useDocument<ViewRaidData>('raid-stats', raidId)

  const [currentSort, setCurrentSort] = useState(userStatSortNames[0])

  if (documentData.state === 'success') {
    const data = documentData.data
    return (
      <$StatsView>
        <$Header>
          <section>
            <h1>{data.title}</h1>
            <$TotalStats>
              <li>
                <Emoji as="🚀" aria-label="rocket" />{' '}
                {Object.keys(data.contributors).length} Contributors
              </li>
              <li>
                <Emoji as="💻" aria-label="laptop" /> {data.commits}{' '}
                {data.commits === 1 ? 'Commit' : 'Commits'}
              </li>
              <li>
                <Emoji as="🗃️" aria-label="card box" /> {data.changedFiles}{' '}
                Changed Files
              </li>
              <li>
                <Emoji as="⚔️" aria-label="crossed swords" /> +{data.additions}{' '}
                -{data.deletions}
              </li>
              <li>
                <Emoji as="📆" aria-label="calendar" />{' '}
                {data.duration
                  ? data.duration
                  : Math.ceil(
                      Math.abs(data.createdAt - Date.now()) / 86400000,
                    )}{' '}
                Day(s)
              </li>
            </$TotalStats>
            <select
              name="sort"
              id="sort"
              disabled={data.commits <= 1}
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
          {Object.values(data.contributors)
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
  } else if (documentData.state === 'error') {
    return <p>{JSON.stringify(documentData.error)}</p>
  } else {
    return documentData.state === 'loading' ? (
      <LoadingSpinner />
    ) : (
      <p>Couldn`t find that Raid - did you fall into the wrong dungeon?</p>
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
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
`
