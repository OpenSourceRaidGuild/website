import { useState, useEffect } from 'react'
import firestore from '#utils/useFirestore'

type UseDocumentData<TDocument> =
  | {
      state: 'loading' | 'not-found'
      data: null
      error: null
    }
  | {
      state: 'success'
      data: TDocument
      error: null
    }
  | {
      state: 'error'
      data: null
      error: Error
    }

function useDocument<TDocument>(
  collectionName: string,
  documentId: string,
): UseDocumentData<TDocument> {
  const [documentData, setDocumentData] = useState<UseDocumentData<TDocument>>({
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
            data: snapshot.data() as TDocument,
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
