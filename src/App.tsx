/**@jsx jsx */
import { Global, jsx } from '@emotion/react'
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LoadingSpinner from './components/loadingSpinner'
import routes from './route.config'
import { globalStyles } from './styles/globalStyles'

const App = () => (
  <>
    <Router>
      <React.Suspense fallback={<LoadingSpinner />}>
        <Switch>
          {routes.map((route, i) => (
            <Route key={i} {...route} />
          ))}
        </Switch>
      </React.Suspense>
    </Router>
    <Global styles={globalStyles} />
  </>
)

export default App
