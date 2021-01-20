import App from './App.svelte'
import firebase from 'firebase/app'
import 'firebase/database'

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyADBEorAXFFIZ9RxTmkCMdx_HHN1KB-Osc',
  authDomain: 'raid-stats.firebaseapp.com',
  databaseURL: 'https://raid-stats-default-rtdb.firebaseio.com',
  projectId: 'raid-stats',
  storageBucket: 'raid-stats.appspot.com',
  messagingSenderId: '1021324051607',
  appId: '1:1021324051607:web:cb265f32ba3c101ee515d2',
  measurementId: 'G-C61B4XYQTH',
}
firebase.initializeApp(firebaseConfig)

// Instantiate App
const app = new App({
  target: document.body,
})

export default app

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept()
  import.meta.hot.dispose(() => {
    app.$destroy()
  })
}
