import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import routes from './route.config'

const App = () => (
  <Router>
    <Switch>
      {routes.map((route, i) => (
        <Route key={i} {...route} />
      ))}
    </Switch>
  </Router>
)

export default App
