type UseFirestoreData<TDocument> =
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

type DocumentWithId<TDocument> = TDocument & { id: string }
