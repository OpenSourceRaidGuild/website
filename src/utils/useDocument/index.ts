import { useState, useEffect } from 'react'
import firestore from '#utils/useFirestore'

type State = 'loading' | 'success' | 'not-found' | 'error'

function useDocument<TDocument>(collectionName: string, documentId: string) {
  const [state, setState] = useState<State>('loading')
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<TDocument | null>(null)

  useEffect(() => {
    firestore
      .collection(collectionName)
      .doc(documentId)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setData(snapshot.data() as TDocument)
          setState('success')
        } else {
          setState('not-found')
        }
      })
      .catch((error) => {
        setError(error)
        setState('error')
      })
  }, [collectionName, documentId])

  return {
    state,
    data,
    error,
  }
}

export default useDocument
