import React from 'react'

import { Link } from 'react-router-dom'
import LoadingSpinner from '#components/loadingSpinner'
import { RAID_STATS } from '#utils/firestoreCollections'
import useFirestoreQuery, { to } from '#utils/useFirestoreQuery'

const AllRaids = () => {
  console.log('Rendering page...')
  const collectionQuery = useFirestoreQuery((firestore) =>
    firestore.collection(RAID_STATS).withConverter(to<ViewRaidData>()),
  )

  if (collectionQuery.status === 'success') {
    const data = collectionQuery.data
    return (
      <>
        <h1>Raids</h1>
        <h2>Active</h2>
        <ul>
          {data
            .filter((r) => r.status === 'active')
            .map((s) => (
              <li key={s.id}>
                <Link to={`/raids/${s.id}`}>
                  {s.title} | {s.dungeon}
                </Link>
              </li>
            ))}
        </ul>
        <h2>Completed</h2>
        <ul>
          {data
            .filter((r) => r.status === 'completed')
            .map((s) => (
              <li key={s.id}>
                <Link to={`/raids/${s.id}`}>
                  {s.title} | {s.dungeon}
                </Link>
              </li>
            ))}
        </ul>
      </>
    )
  } else if (collectionQuery.status === 'error') {
    return (
      <>
        <h1>An error occurred</h1>
        <code>{JSON.stringify(collectionQuery.error)}</code>
      </>
    )
  }

  return collectionQuery.status === 'loading' ? (
    <LoadingSpinner />
  ) : (
    // Theoretically this can/should never be hit... But a fun message nonetheless
    <p>{`We ain't doing much, here`}</p>
  )
}

export default AllRaids
