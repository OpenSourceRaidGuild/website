/**@jsx jsx */
import Header from './components/header'
import { Global } from '@emotion/react'
import { lazy, Suspense, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LoadingSpinner from './components/loadingSpinner'
import Home from './routes/Home'
import NotFound from './routes/NotFound'
import { globalStyles } from './styles/globalStyles'

const AllRaids = lazy(() => import('./routes/raids'))
const ViewRaid = lazy(() => import('./routes/raids/ViewRaid'))

export const AppRouter = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <Switch>
      <Route path="/raids" exact component={AllRaids} />
      <Route path="/raids/:raidId" exact component={ViewRaid} />
      <Route path="/" exact component={Home} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Suspense>
)

const App = () => (
  <Fragment>
    <Router>
      <Header />
      <AppRouter />
    </Router>
    <Global styles={globalStyles} />
  </Fragment>
)

export default App
