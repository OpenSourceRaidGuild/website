import React from 'react'

import { Link } from 'react-router-dom'
import LoadingSpinner from '#components/loadingSpinner'
import useFirestoreQuery, { to } from '#utils/useFirestoreQuery'
import { RAID_STATS } from '#utils/firestoreCollections'

const AllRaids = () => {
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
  }

  return collectionQuery.status === 'loading' ? (
    <LoadingSpinner />
  ) : (
    // Theoretically this can/should never be hit... But a fun message nonetheless
    <p>
      {`Strange... I could've sworn the Manticore was here a second ago! Seems
        there aren't any Raids right now. Try again later!`}
    </p>
  )
}

export default AllRaids
