import { useState, useEffect } from 'react'
import firestore from '#utils/useFirestore'

type State = 'loading' | 'success' | 'not-found' | 'error'

function useCollection<TDocument>(collectionName: string) {
  const [state, setState] = useState<State>('loading')
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<(TDocument & { id: string })[] | null>(null)

  useEffect(() => {
    firestore
      .collection(collectionName)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          setData(
            snapshot.docs.map((s) => ({
              id: s.id,
              ...(s.data() as TDocument),
            })),
          )
          setState('success')
        } else {
          setState('not-found')
        }
      })
      .catch((error) => {
        setError(error)
        setState('error')
      })
  }, [collectionName])

  return {
    state,
    data,
    error,
  }
}

export default useCollection
