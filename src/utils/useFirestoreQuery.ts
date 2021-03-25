import { useReducer, useEffect } from 'react'
import useMemoCompare from './useMemoCompare'

import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCAgs6SNew9kKKFgQh7NLkqHK1n9Akq-GM',
  authDomain: 'raid-stats-c1d5a.firebaseapp.com',
  databaseURL: 'https://raid-stats-c1d5a-default-rtdb.firebaseio.com',
  projectId: 'raid-stats-c1d5a',
  storageBucket: 'raid-stats-c1d5a.appspot.com',
  messagingSenderId: '47482470658',
  appId: '1:47482470658:web:bd07aa5f9e1b0df3c2c21b',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const firestore = firebase.firestore()

// Comment out the following to pull from the live firestore DB
if (import.meta.env.NODE_ENV !== 'production') {
  firestore.useEmulator('localhost', 8080)
}

export function to<TData>() {
  return {
    toFirestore(data: TData): firebase.firestore.DocumentData {
      return data
    },
    fromFirestore(
      snapshot: firebase.firestore.QueryDocumentSnapshot,
      options: firebase.firestore.SnapshotOptions,
    ): TData {
      return snapshot.data(options) as TData
    },
  }
}

const reducer = <
  TQueryResult extends FirestoreQueryResultUnion<unknown>,
  TData
>(
  state: FirestoreQueryState<TQueryResult, TData>,
  action: FirestoreQueryStateAction<TData>,
): FirestoreQueryState<TQueryResult, TData> => {
  switch (action.type) {
    case 'idle':
    case 'loading':
      return { status: action.type, data: null, error: null }
    case 'success':
      return {
        status: 'success',
        data: action.payload as FirestoreQueryStateData<TQueryResult, TData>,
        error: null,
      }
    case 'error':
      return { status: 'error', data: null, error: action.payload }
    default:
      throw new Error('invalid action')
  }
}

export default function useFirestoreQuery<
  TQuery extends FirestoreQuery<unknown>,
  TQueryResult extends ReturnType<TQuery>,
  TData extends FirestoreQueryDataType<TQuery>
>(query: TQuery): FirestoreQueryState<TQueryResult, TData> {
  const [state, dispatch] = useReducer<
    FirestoreQueryReducer<TQueryResult, TData>
  >(reducer, {
    status: 'loading',
    data: null,
    error: null,
  })

  // Get cached Firestore query object with useMemoCompare (https://usehooks.com/useMemoCompare)
  // Needed because firestore.collection().doc() will always be a new object reference
  // causing effect to run -> state change -> rerender -> effect runs -> etc ...
  // This is nicer than requiring hook consumer to always memoize query with useMemo.
  const queryCached = useMemoCompare(query(firestore), (prevQuery) => {
    if (prevQuery && query) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      query.isEqual(prevQuery)
    }

    return false
  })

  useEffect(() => {
    if (!queryCached) {
      dispatch({ type: 'idle' })
      return
    }

    dispatch({ type: 'loading' })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return queryCached.onSnapshot(
      (
        snapshot:
          | firebase.firestore.QuerySnapshot<TData>
          | firebase.firestore.DocumentSnapshot<TData>,
      ) => {
        if ('docs' in snapshot) {
          dispatch({
            type: 'success',
            payload: getCollectionData(snapshot),
          })
        } else {
          const data = getDocData(snapshot)

          dispatch({ type: 'success', payload: data }) // need something better for the null case...
        }
      },
      (error: firebase.firestore.FirestoreError) => {
        dispatch({ type: 'error', payload: error })
      },
    )
  }, [queryCached]) // Only run effect if queryCached changes

  return state
}

function getDocData<TData>(
  docSnapshot: firebase.firestore.DocumentSnapshot<TData>,
): FirestoreDocumentData<TData> | null {
  return docSnapshot.exists === true
    ? { id: docSnapshot.id, ...(docSnapshot.data() as TData) }
    : null
}

function getCollectionData<TData>(
  collectionSnapshot: firebase.firestore.QuerySnapshot<TData>,
) {
  return collectionSnapshot.docs
    .map(getDocData)
    .filter((d) => d) as FirestoreDocumentData<TData>[]
}

type FirestoreDocumentData<TData> = TData & { id: string }

type FirestoreQueryResultUnion<TData> =
  | firebase.firestore.Query<TData>
  | firebase.firestore.CollectionReference<TData>
  | firebase.firestore.DocumentReference<TData>

type FirestoreQuery<TData> = (
  firestore: firebase.firestore.Firestore,
) => FirestoreQueryResultUnion<TData>

type FirestoreQueryDataType<
  TQuery extends FirestoreQuery<unknown>
> = TQuery extends FirestoreQuery<infer TData> ? TData : never

type FirestoreQueryState<
  TQueryResult extends FirestoreQueryResultUnion<unknown>,
  TData
> =
  | {
      status: 'idle' | 'loading'
      data: null
      error: null
    }
  | {
      status: 'success'
      data: FirestoreQueryStateData<TQueryResult, TData>
      error: null
    }
  | {
      status: 'error'
      data: null
      error: Error
    }

type FirestoreQueryStateData<
  TQueryResult extends FirestoreQueryResultUnion<unknown>,
  TData
> = TQueryResult extends firebase.firestore.DocumentReference
  ? FirestoreDocumentData<TData> | null
  : FirestoreDocumentData<TData>[]

type FirestoreQueryReducer<
  TQueryResult extends FirestoreQueryResultUnion<unknown>,
  TData
> = (
  state: FirestoreQueryState<TQueryResult, TData>,
  action: FirestoreQueryStateAction<TData>,
) => FirestoreQueryState<TQueryResult, TData>

type FirestoreQueryStateAction<TData> =
  | {
      type: 'idle' | 'loading'
    }
  | {
      type: 'success'
      payload:
        | FirestoreDocumentData<TData>
        | FirestoreDocumentData<TData>[]
        | null
    }
  | {
      type: 'error'
      payload: Error
    }
