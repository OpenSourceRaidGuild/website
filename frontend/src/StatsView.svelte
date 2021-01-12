<script lang='ts'>
  import { useQuery } from '@sveltestack/svelte-query'
  import { getRepoDetails, getAllUserStatsFromRepoSince } from './queries'
  import { getStatsFromCommits } from './utils'

  export let originalOwner: string
  export let prId: number
  export let raidRepoOwner: string
  export let raidRepo: string

  const repoDetails = useQuery<PullStats, Error>('prDetails', () => getRepoDetails(originalOwner, raidRepo, prId))
  let createdAt: string
  $: createdAt = $repoDetails.data?.createdAt as string

  const commits = useQuery<Commit[], Error>(
    ['commits', createdAt],
    () => getAllUserStatsFromRepoSince(raidRepoOwner, raidRepo, createdAt, null),
    {
      enabled: !!createdAt
    }
  )
  $: {
    commits.setOptions(
      ['commits', createdAt],
      () => getAllUserStatsFromRepoSince(raidRepoOwner, raidRepo, createdAt, null),
      {
        enabled: !!createdAt
      }
    )
  }

  const userStatSorts: { [key: string]: (a: UserStats, b:UserStats) => number } = {
    'commits': (a, b) => b.commits - a.commits,
    'additions': (a, b) => b.additions - a.additions,
    'deletions': (a, b) => b.deletions - a.deletions,
  }
  const userStatSortNames = Object.keys(userStatSorts)

  let currentSort = userStatSortNames[0]

  let userStats: UserStats[]
  $: userStats = getStatsFromCommits(`${raidRepoOwner}/${raidRepo}`, $commits.data).sort(userStatSorts[currentSort])
</script>

<style>
  #stats-view {
    height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr;
  }
  #stats-view > * {
    padding: 1rem;
  }
  
  header {
    z-index: 1;
    background-color: white;
    border-bottom: 1px solid hsl(0, 0%, 78%);
    box-shadow: 0 2px 4px 0 hsla(0, 0%, 0%, 10%);
  }
  header > .content {
    margin: 0 auto;
    width: 700px;
  }

  h1 {
    font-size: 3rem;
    line-height: 3rem;
    margin-bottom: 2rem;
  }

  .total-stats {
    display: flex;
    direction: row;
  }
  .total-stats > :first-child {
    width: 23.5rem;
  }
  .total-stats > :not(:first-child) {
    margin-left: 2rem;
  }

  select {
    margin-top: 2rem;
    border: none;
    background-color: inherit;
    font-size: 1em;
    text-transform: capitalize;
  }

  /* MAIN DATA */  
  .stat-container {
    overflow-y: auto;
  }
  .stat-container > * {
    margin: 0 auto;
    width: 700px;
  }

  .user-stat-block {
    background-color: white;
    border: 1px solid hsl(0, 0%, 78%);
    border-radius: 8px;
    padding: 1rem 2rem;
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: 3.75rem 6rem 8.365rem 3fr;
    grid-template-areas:
      "rank avatar name stats"
    ;
  }
  .user-stat-block:not(:first-child) {
    margin-top: 1rem;
  }

  .rank {
    font-size: 2rem;
    opacity: 0.8;
    grid-area: rank;
    align-self: center;
  }

  .avatar {
    border-radius: 50%;
    width: 6rem;
    height: 6rem;
    grid-area: avatar;
    align-self: center;
  }

  .name {
    grid-area: name;
    align-self: center;
  }

  .stat-block {
    grid-area: stats;
    align-self: center;
  }

  .emoji-stat {
    font-size: 1.5rem;
    margin-right: 1rem;
  }
  .emoji-stat-light {
    font-size: 1.25rem;
    margin-right: 1rem;
    opacity: 0.8;
  }
</style>

<main id="stats-view">
  <header>
    <div class="content">
      <h1>{raidRepo}</h1>
      {#if $repoDetails.isLoading}
        <p>Loading...</p>
      {:else if $repoDetails.error}
        <p>{$repoDetails.error?.message}</p>
      {:else}
        <div class="total-stats">
          <div>
            <p><span class="emoji-stat">🚀</span>{$commits.status === 'success' ? `${userStats.length} Contributors` : 'Loading...'}</p>
            <p><span class="emoji-stat">💾</span>{$repoDetails.data?.commits.totalCount} {$repoDetails.data?.commits.totalCount === 1 ? 'Commit' : 'Commits'}</p>
            <p><span class="emoji-stat">📃</span>{$repoDetails.data?.changedFiles} Changed Files</p>
          </div>
          <div>
            <p><span class="emoji-stat">⚔️</span>+{$repoDetails.data?.additions}&emsp;-{$repoDetails.data?.deletions}</p>
            <p><span class="emoji-stat">🔥</span>{($repoDetails.data?.additions ?? 0) - ($repoDetails.data?.deletions ?? 0)} Net Deletions</p>
          </div>
        </div>
        <!-- <p>Created: {$repoDetails.data?.createdAt}</p> -->
      {/if}
      Sort by: <select bind:value={currentSort} disabled={$commits.status !== 'success'}>
        {#each userStatSortNames as theSort}
          <option value={theSort}>
            {theSort}
          </option>
        {/each}
      </select>
    </div>
  </header>
  
  <div class="stat-container">
    {#if $commits.isIdle}
      <p>Waiting...</p>
    {:else if $commits.error}
      <p>{$commits.error?.message}</p>
    {:else if $commits.isLoading}
      <p>Loading...</p>
    {:else}
      <ol id="stats">
        {#each userStats ?? [] as userStat, index (userStat.user)}
          <li class="user-stat-block">
            <p class="rank">#{index + 1}</p>
            <img class="avatar" src="{userStat.avatarUrl}" alt="{userStat.user}'s Profile Image">
            <p class="name">{userStat.user}</p>
            <div class="stat-block">
              <p><span class="emoji-stat-light">⚔️️️️️️</span>+{userStat.additions}&emsp;-{userStat.deletions}</p>
              <p><span class="emoji-stat-light">💾</span>{userStat.commits} {userStat.commits === 1 ? 'Commit' : 'Commits'}</p>
            </div>
          </li>
        {/each}
        </ol>
    {/if}
  </div>
</main>