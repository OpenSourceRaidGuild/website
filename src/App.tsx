/**@jsx jsx */
import Header from '#components/header'
import { Global, jsx } from '@emotion/react'
import * as React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LoadingSpinner from './components/loadingSpinner'
import Home from './routes/Home'
import NotFound from './routes/NotFound'
import { globalStyles } from './styles/globalStyles'

const AllRaids = React.lazy(() => import('./routes/raids'))
const ViewRaid = React.lazy(() => import('./routes/raids/ViewRaid'))

const AppRouter = () => (
  <React.Suspense fallback={<LoadingSpinner />}>
    <Switch>
      <Route path="/raids" exact component={AllRaids} />
      <Route path="/raids/:raidId" exact component={ViewRaid} />
      <Route path="/" exact component={Home} />
      <Route path="*" component={NotFound} />
    </Switch>
  </React.Suspense>
)

const App = () => (
  <>
    <Router>
      <Header />
      <AppRouter />
    </Router>
    <Global styles={globalStyles} />
  </>
)

export default App
