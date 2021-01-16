<script lang='ts'>
	import { Router, Route, Link } from 'svelte-navigator'

	import QuestBoard from './routes/quests/index.svelte'
	import Raids from './routes/raids/index.svelte'
	import ViewRaid from './routes/raids/ViewRaid.svelte'
	import NotFound from './routes/NotFound.svelte'
</script>

<Router>
	<Route path="/">
		<h1>Welcome to the Raid Guild</h1>
		<Link to="/raids/hospitalrun-frontend">Raid Stats</Link>
	</Route>
	<Route path="quests" component={QuestBoard} />
	<Route path="raids" component={Raids} />
	<Route path="raids/*raidRepo" component={ViewRaid} />
	<Route path="*" component={NotFound} />
</Router>
  