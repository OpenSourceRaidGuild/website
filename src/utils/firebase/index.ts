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

export default firestore
