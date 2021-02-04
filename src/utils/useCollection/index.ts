import { useState, useEffect } from 'react'
import firestore from '#utils/firestore'

interface CollectionState<TDocument> {
  data: WithID<TDocument>[]
  loading: boolean
  error: Error | null
}

type DocumentData = firebase.default.firestore.DocumentData
export type WithID<TDocument extends DocumentData> = TDocument & { id: string }

function useCollection<TDocument extends DocumentData>(
  collectionName: string,
): CollectionState<TDocument> {
  const [collectionState, setCollectionState] = useState<
    CollectionState<TDocument>
  >({
    data: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    async function getCollection() {
      try {
        const collectionSnapshot = await firestore
          .collection(collectionName)
          .get()
        const documents = collectionSnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as WithID<TDocument>),
        )
        setCollectionState({ data: documents, loading: false, error: null })
      } catch (error) {
        setCollectionState({ data: [], loading: false, error })
      }
    }
    getCollection()
  }, [collectionName])

  return collectionState
}

export default useCollection
