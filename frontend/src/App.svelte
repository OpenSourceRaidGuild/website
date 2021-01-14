<script lang='ts'>
	import { Router, Route, Link } from 'svelte-navigator'
	import { QueryClientProvider } from '@sveltestack/svelte-query'

	import QuestBoard from './routes/quests/index.svelte'
	import Raids from './routes/raids/index.svelte'
	import ViewRaid from './routes/raids/ViewRaid.svelte'
	import NotFound from './routes/NotFound.svelte'
</script>

<Router>
	<QueryClientProvider>
		<Route path="/">
			<Link to="/raids/hospitalrun-frontend">Raid Stats</Link>
		</Route>
		<Route path="quests" component={QuestBoard} />
		<Route path="raids" component={Raids} />
		<Route path="raids/*raidRepo" component={ViewRaid} />
		<Route path="*" component={NotFound} />
	</QueryClientProvider>
</Router>
  