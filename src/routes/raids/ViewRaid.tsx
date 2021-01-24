import React, { Suspense, useEffect, useState } from 'react'
import firebase from '../../utils/firebase'
import { useParams } from 'react-router-dom'

type State = 'loading' | 'success' | 'not-found' | 'error'

const ViewRaid = () => {
  const { raidId } = useParams<{raidId: string}>()
  const [state, setState] = useState<State>('loading')
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<ViewRaidData | null>(null)

  useEffect(() => {
    firebase.database().ref(`/raids/${raidId}`).once('value')
      .then(snapshot => {
        const snapshotValue: ViewRaidData = snapshot.val()

        if (snapshotValue) {
          setData(snapshotValue)
          setError(null)
          setState('success')
        } else {
          setData(null)
          setError(null)
          setState('not-found')
        }
      })
      .catch(error => {
        console.log(error)
        setData(null)
        setError(error)
        setState('error')
      })
  }, [])

  if (state === 'loading') {
    return <p>Loading...</p>
  } else if (state === 'error') {
    return <p>{JSON.stringify(error)}</p>
  } else if (state === 'not-found') {
    return <p>Couldn't find that Raid - did you fall into the wrong dungeon?</p>
  } else {
    return (
      <main>
        <header style={{ height: '7vh' }}>
          <h1>{data?.title}</h1>
          <p>🚀 {Object.keys(data?.contributors ?? {}).length} Contributors</p>
          <p>💾 {data?.commits} {(data?.commits ?? 0) === 1 ? 'Commit' : 'Commits'}</p>
          <p>📃 {data?.changedFiles} Changed Files</p>
          <p>⚔️ +{data?.additions} -{data?.deletions}</p>
          <p>🔥 {(data?.additions ?? 0) - (data?.deletions ?? 0)} Net Deletions</p>
        </header>
        <ol style={{ overflowY: 'auto', height: '90vh' }}>
          {Object.values(data?.contributors ?? {}).map((contributor, index) => (
            <li key={contributor.userId}>
              <p>#{index + 1}</p>
              <img src={contributor.avatarUrl} alt={`${contributor.user}'s avatar`} />
              <p>{contributor.user}</p>
              <p>
                <span>⚔️ +{contributor.additions} -{contributor.deletions}</span>
                <span>💾 {contributor.commits} {contributor.commits === 1 ? 'Commit' : 'Commits'}</span>
              </p>
            </li>
          ))}
        </ol>
      </main>
    )
  }
}

export default ViewRaid
