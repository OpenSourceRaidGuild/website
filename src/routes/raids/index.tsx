import React from 'react'

import { Link } from 'react-router-dom'
import LoadingSpinner from '#components/loading-spinner'
import useCollection from '#utils/useCollection'

const AllRaids = () => {
  const collectionData = useCollection<ViewRaidData>('raid-stats')

  if (collectionData.state === 'success') {
    const data = collectionData.data
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
  } else {
    return collectionData.state === 'loading' ? (
      <LoadingSpinner />
    ) : (
      <p>
        {`Strange... I could've sworn the Manticore was here a second ago! Seems
        there won't be any Raids for a while. Try again later!`}
      </p>
    )
  }
}

export default AllRaids
