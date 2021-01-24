import ViewRaid from './routes/raids/ViewRaid'
import AllRaids from './routes/raids'
import Home from './routes/Home'
import NotFound from './routes/NotFound'

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
