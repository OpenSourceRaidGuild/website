/**@jsx jsx */
import { Global, jsx } from '@emotion/react'
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LoadingSpinner from './components/loading-spinner'
import routes from './route.config'
import { globalStyles } from './styles/globalStyles'

const App = () => (
  <Router>
    <React.Suspense fallback={<LoadingSpinner />}>
      <Switch>
        {routes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
        <Global styles={globalStyles} />
      </Switch>
    </React.Suspense>
  </Router>
)

export default App
