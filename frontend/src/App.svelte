<script lang="ts">
	import { Router, Route } from 'svelte-navigator'

	import QuestBoard from './routes/quests/index.svelte'
	import Raids from './routes/dungeons/raids/index.svelte'
	import ViewRaid from './routes/dungeons/raids/ViewRaid.svelte'
	import NotFound from './routes/NotFound.svelte'
</script>

<Router>
	<Route path="/">
		<h1>Welcome to the Open Source Raid Guild</h1>
	</Route>
	<Route path="quests" component={QuestBoard} />
	<Route path="raids" component={Raids} />
	<Route path="raids/:id" component={ViewRaid} />
	<Route path="*" component={NotFound} />
</Router>
