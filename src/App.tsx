/**@jsx jsx */
import { firebaseConfig } from '#utils/useFirestore'
import { Global, jsx } from '@emotion/react'
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { FirebaseAppProvider } from 'reactfire'

import LoadingSpinner from './components/loading-spinner'
import routes from './route.config'
import { globalStyles } from './styles/globalStyles'

const App = () => (
  <>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Router>
        <React.Suspense fallback={<LoadingSpinner />}>
          <Switch>
            {routes.map((route, i) => (
              <Route key={i} {...route} />
            ))}
          </Switch>
        </React.Suspense>
      </Router>
    </FirebaseAppProvider>
    <Global styles={globalStyles} />
  </>
)

export default App
