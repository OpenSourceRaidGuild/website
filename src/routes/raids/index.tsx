import React from 'react'

import { Link } from 'react-router-dom'
import LoadingSpinner from '#components/loading-spinner'
import useCollection from '#utils/useCollection'

const AllRaids = () => {
  const { state, data, error } = useCollection<ViewRaidData>('raid-stats')

  if (state === 'loading') {
    return <LoadingSpinner />
  } else if (state === 'error') {
    return <p>{JSON.stringify(error)}</p>
  } else {
    return (
      <>
        <h1>Raids</h1>
        <ul>
          {(data ?? []).map((s) => (
            <li key={s.id}>
              <Link to={`/raids/${s.id}`}>{s.title}</Link>
            </li>
          ))}
        </ul>
      </>
    )
  }
}

export default AllRaids
