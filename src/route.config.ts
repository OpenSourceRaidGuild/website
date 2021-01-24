import { lazy } from 'react'
import Home from './routes/Home'
import NotFound from './routes/NotFound'

const ViewRaid = lazy(() => import('./routes/raids/ViewRaid'))
const AllRaids = lazy(() => import('./routes/raids'))

type Route = {
  path: string
  exact?: true
  component: React.FunctionComponent
}

const routes: Route[] = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/raids',
    exact: true,
    component: AllRaids,
  },
  {
    path: '/raids/:raidId',
    component: ViewRaid,
  },
  {
    path: '*',
    component: NotFound,
  },
]

export default routes
