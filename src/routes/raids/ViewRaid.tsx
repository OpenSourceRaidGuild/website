import React, { useEffect, useState } from 'react'
import firestore from '#utils/firebase'
import { useParams } from 'react-router-dom'

import styled from '@emotion/styled'

import UserStatBlock from '#components/user-stat-block'
import Emoji from '#components/emoji'
import LoadingSpinner from '#components/loading-spinner'

type State = 'loading' | 'success' | 'not-found' | 'error'

const StatsView = styled.main`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
  > * {
    padding: 1rem;
  }
`

const Header = styled.header`
  z-index: 1;
  background-color: white;
  border-bottom: 1px solid hsl(0, 0%, 78%);
  box-shadow: 0 2px 4px 0 hsla(0, 0%, 0%, 10%);
  > div {
    margin: 0 auto;
    max-width: 700px;
  }

  > div > h1 {
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

const ViewRaid = () => {
  const { raidId } = useParams<{ raidId: string }>()
  const [state, setState] = useState<State>('loading')
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<ViewRaidData | null>(null)

  useEffect(() => {
    firestore
      .collection('raid-stats')
      .doc(raidId)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setData(snapshot.data() as ViewRaidData)
          setState('success')
        } else {
          setState('not-found')
        }
      })
      .catch((error) => {
        setError(error)
        setState('error')
      })
  }, [raidId])

  if (state === 'loading') {
    return <p>Loading...</p>
  } else if (state === 'error') {
    return <p>{JSON.stringify(error)}</p>
  } else if (state === 'not-found') {
    return <p>Couldn`t find that Raid - did you fall into the wrong dungeon?</p>
  } else {
    return (
      <StatsView>
        <Header>
          <div>
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
          </div>
        </Header>
        <StatContainer>
          {Object.values(data?.contributors ?? {}).map((contributor, index) => (
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
