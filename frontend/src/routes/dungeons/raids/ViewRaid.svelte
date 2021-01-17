<script lang="ts">
  import { useParams } from "svelte-navigator";
  import firebase from "firebase/app";

  import LoadingSpinner from "#components/LoadingSpinner.svelte";
  import UserStatBlock from "#components/UserStatBlock.svelte";

  import { fade } from "svelte/transition";

  const params = useParams<{ raidRepo: string }>();
  const raidRepo = $params.raidRepo;

  const database = firebase.database();
  const dataPromise = database
    .ref(`/${raidRepo}`)
    .once("value")
    .then((snapshot) => snapshot.val() as ViewRaidData);

  const userStatSorts: {
    [key: string]: (a: UserStats, b: UserStats) => number;
  } = {
    commits: (a, b) => b.commits - a.commits,
    additions: (a, b) => b.additions - a.additions,
    deletions: (a, b) => b.deletions - a.deletions,
  };
  const userStatSortNames = Object.keys(userStatSorts);

  let currentSort = userStatSortNames[0];
</script>

<main id="stats-view">
  {#await dataPromise}
    <LoadingSpinner />
  {:then data}
    <header in:fade>
      <div class="content">
        <h1>{data.title}</h1>
        <div class="total-stats">
          <div>
            <p>
              <span class="emoji-stat">🚀</span>{`${
                Object.keys(data.contributors).length
              }`} Contributors
            </p>
            <p>
              <span class="emoji-stat">💾</span>{data.commits}
              {data.commits === 1 ? "Commit" : "Commits"}
            </p>
            <p>
              <span class="emoji-stat">📃</span>{data.changedFiles} Changed Files
            </p>
          </div>
          <div>
            <p>
              <span class="emoji-stat">⚔️</span
              >+{data.additions}&emsp;-{data.deletions}
            </p>
            <p>
              <span class="emoji-stat">🔥</span>{data.additions -
                data.deletions} Net Deletions
            </p>
          </div>
        </div>
        Sort by:<select bind:value={currentSort} disabled={data.commits <= 1}>
          {#each userStatSortNames as theSort}
            <option value={theSort}>
              {theSort}
            </option>
          {/each}
        </select>
      </div>
    </header>

    <div class="stat-container">
      <ol id="stats" in:fade>
        {#each Object.values(data.contributors).sort(userStatSorts[currentSort]) as userStat, index (index + userStat.userId)}
          <UserStatBlock rank={index + 1} userStats={userStat} />
        {/each}
      </ol>
    </div>
  {:catch error}
    <p>{error.message}</p>
  {/await}
</main>

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

  .stat-container {
    overflow-y: auto;
  }
  .stat-container > * {
    margin: 0 auto;
    width: 700px;
  }
  .emoji-stat {
    font-size: 1.5rem;
    margin-right: 1rem;
  }
</style>
