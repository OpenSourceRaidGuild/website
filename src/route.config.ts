import ViewRaid from './routes/raids/ViewRaid'
import AllRaids from './routes/raids'
import Home from './routes/Home'

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
    path: '/:id',
    component: ViewRaid,
  },
]

export default routes
