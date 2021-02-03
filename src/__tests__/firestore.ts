/**
 * @jest-environment node
 */

import { firebase } from '../tests/testUtils'

import type { TokenOptions } from '@firebase/rules-unit-testing/dist/src/api'

// eslint-disable-next-line prettier/prettier
const PROJECT_ID = "raid-stats-c1d5a"

function getAuthFirestore(auth?: TokenOptions) {
  const db = firebase
    .initializeTestApp({ projectId: PROJECT_ID, auth })
    .firestore()

  // The following line is for this error
  // "[Warning: FIRESTORE_EMULATOR_HOST not set, using default value localhost:8080]"
  db.useEmulator('localhost', 8080)
  return db
}

test('Should Succeed: SET - with Auth', async () => {
  const db = getAuthFirestore({ uid: 'alice' })

  const usersRef = db.collection('users').doc('alice')
  await firebase.assertSucceeds(usersRef.get())
})

test('Should Fail: SET - without Auth', async () => {
  const db = getAuthFirestore()

  const usersRef = db.collection('users').doc('alice')
  await firebase.assertFails(
    usersRef.set({
      owner: 'alice',
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    }),
  )
})
test('Should Succeed: GET - with Auth', async () => {
  const db = getAuthFirestore({ uid: 'alice' })

  const usersRef = db.collection('users').doc('alice')
  await firebase.assertSucceeds(usersRef.get())
})

test('Should Succeed: GET - without Auth', async () => {
  const db = getAuthFirestore()

  const usersRef = db.collection('users').doc('alice')
  await firebase.assertSucceeds(usersRef.get())
})
