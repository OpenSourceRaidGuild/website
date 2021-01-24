import React, { useEffect, useState } from 'react'
import firestore from '#utils/firebase'
import { useParams } from 'react-router-dom'

import UserStatBlock from '#components/user-stat-block'
import Emoji from '#components/emoji'
import LoadingSpinner from '#components/loading-spinner'

type State = 'loading' | 'success' | 'not-found' | 'error'

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
      .then(snapshot => {
        if (snapshot.exists) {
          setData(snapshot.data() as ViewRaidData)
          setState('success')
        } else {
          setState('not-found')
        }
      })
      .catch(error => {
        setError(error)
        setState('error')
      })
  }, [raidId])

  if (state === 'loading') {
    return <LoadingSpinner />
  } else if (state === 'error') {
    return <p>{JSON.stringify(error)}</p>
  } else if (state === 'not-found') {
    return <p>Couldn`t find that Raid - did you fall into the wrong dungeon?</p>
  } else {
    return (
      <main>
        <header style={{ height: '7vh' }}>
          <h1>{data?.title}</h1>
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
            <Emoji as="⚔️" aria-label="crossing-swords" /> +{data?.additions} -
            {data?.deletions}
          </p>
          <p>
            <Emoji as="🔥" aria-label="fire" />{' '}
            {(data?.additions ?? 0) - (data?.deletions ?? 0)} Net Deletions
          </p>
        </header>
        <ol style={{ overflowY: 'auto', height: '90vh' }}>
          {Object.values(data?.contributors ?? {}).map((contributor, index) => (
            <UserStatBlock
              key={contributor.userId}
              rank={index + 1}
              userStats={contributor}
            />
          ))}
        </ol>
      </main>
    )
  }
}

export default ViewRaid
