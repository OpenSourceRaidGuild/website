import { lazy } from 'react'
import type { RouteProps } from 'react-router-dom'
import Home from './routes/Home'
import NotFound from './routes/NotFound'

const ViewRaid = lazy(() => import('./routes/raids/ViewRaid'))
const AllRaids = lazy(() => import('./routes/raids'))

const routes: RouteProps[] = [
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
