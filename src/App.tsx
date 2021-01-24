import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LoadingSpinner from './components/loading-spinner'
import routes from './route.config'

const App = () => (
  <Router>
    <Switch>
      <React.Suspense fallback={<LoadingSpinner />}>
        {routes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </React.Suspense>
    </Switch>
  </Router>
)

export default App
