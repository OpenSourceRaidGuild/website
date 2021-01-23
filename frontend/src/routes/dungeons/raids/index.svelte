<script lang="ts">
  import firebase from 'firebase/app'

  import { Link } from 'svelte-navigator'
  import LoadingSpinner from '#components/LoadingSpinner.svelte'
  import Card from '#components/Card.svelte'

  const database = firebase.database()
  const dataPromise = database
    .ref()
    .once('value')
    .then((snapshot) => snapshot.val() as ViewRaidData[])
</script>

{#await dataPromise}
  <LoadingSpinner />
{:then raids}
  <h1>Raids</h1>
  <ul>
    {#each raids.filter((r) => r != null) as raid (raid.id)}
      <Card let:className>
        <li class={className}>
          <Link to={`/raids/${raid.id}`}>
            {raid.title}
          </Link>
        </li>
      </Card>
    {/each}
  </ul>
{:catch error}
  <p>{error.message}</p>
{/await}
