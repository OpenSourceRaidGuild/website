import { useState, useEffect } from 'react'
import firestore from '#utils/firestore'

function useDocument<TDocument>(
  collectionName: string,
  documentId: string,
): UseFirestoreData<DocumentWithId<TDocument>> {
  const [documentData, setDocumentData] = useState<
    UseFirestoreData<DocumentWithId<TDocument>>
  >({
    state: 'loading',
    data: null,
    error: null,
  })

  useEffect(() => {
    firestore
      .collection(collectionName)
      .doc(documentId)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setDocumentData({
            state: 'success',
            data: {
              ...snapshot.data(),
              id: snapshot.id,
            } as DocumentWithId<TDocument>,
            error: null,
          })
        } else {
          setDocumentData({
            state: 'not-found',
            data: null,
            error: null,
          })
        }
      })
      .catch((error) => {
        setDocumentData({
          state: 'error',
          data: null,
          error: error,
        })
      })
  }, [collectionName, documentId])

  return documentData
}

export default useDocument
