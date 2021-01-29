/**@jsx jsx */
import { Global, jsx } from '@emotion/react'
import * as React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LoadingSpinner from './components/loading-spinner'
import Home from './routes/Home'
import NotFound from './routes/NotFound'
import { globalStyles } from './styles/globalStyles'

const Raids = React.lazy(() => import('./routes/raids'))
const Raid = React.lazy(() => import('./routes/raid'))

const AppRouter = () => (
  <React.Suspense fallback={<LoadingSpinner />}>
    <Switch>
      <Route path="/raids" exact component={Raids} />
      <Route path="/raids/:raidId" exact component={Raid} />
      <Route path="/" exact component={Home} />
      <Route path="*" component={NotFound} />
    </Switch>
  </React.Suspense>
)

const App = () => (
  <>
    <Router>
      <AppRouter />
    </Router>
    <Global styles={globalStyles} />
  </>
)

export default App
