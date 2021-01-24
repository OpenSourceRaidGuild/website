import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LoadingSpinner from './components/loading-spinner'
import routes from './route.config'

const App = () => (
  <Router>
    <React.Suspense fallback={<LoadingSpinner />}>
      <Switch>
        {routes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </Switch>
    </React.Suspense>
  </Router>
)

export default App
