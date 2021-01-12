<script lang='ts'>
	import { QueryClientProvider } from '@sveltestack/svelte-query'
	import StatsView from './StatsView.svelte'

	const raidDetials = {
		originalOwner: 'hospitalrun',
		raidRepoOwner: 'kcdraidgroup',
		raidRepo: 'hospitalrun-frontend',
		prId: 2516,
	}
</script>

<QueryClientProvider>
	<StatsView {...raidDetials} />
</QueryClientProvider>
  