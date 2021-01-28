import { useState, useEffect } from 'react'
import firestore from '#utils/useFirestore'

function useCollection<TDocument>(
  collectionName: string,
): UseFirestoreData<DocumentWithId<TDocument>[]> {
  const [collectionData, setCollectionData] = useState<
    UseFirestoreData<DocumentWithId<TDocument>[]>
  >({
    state: 'loading',
    data: null,
    error: null,
  })

  useEffect(() => {
    firestore
      .collection(collectionName)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          setCollectionData({
            state: 'success',
            data: snapshot.docs.map<DocumentWithId<TDocument>>(
              (s) =>
                ({
                  id: s.id,
                  ...s.data(),
                } as DocumentWithId<TDocument>),
            ),
            error: null,
          })
        } else {
          setCollectionData({
            state: 'not-found',
            data: null,
            error: null,
          })
        }
      })
      .catch((error) => {
        setCollectionData({
          state: 'error',
          data: null,
          error,
        })
      })
  }, [collectionName])

  return collectionData
}

export default useCollection
