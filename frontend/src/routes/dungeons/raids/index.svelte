<script lang='ts'>
  import firebase from 'firebase/app'

  import { Link } from 'svelte-navigator'
  import LoadingSpinner from '#components/LoadingSpinner.svelte'

  const database = firebase.database()
  const dataPromise = database.ref().once('value').then(snapshot => snapshot.val() as ViewRaidData[])
</script>


{#await dataPromise}
<LoadingSpinner />
{:then raids}
  <h1>Raids</h1>
  {#each raids.filter(r => r != null) as raid (raid.id)}
    <p>
      <Link to={`/raids/${raid.id}`}>{raid.title}</Link>
    </p>
  {/each}
{:catch error}
  <p>{error.message}</p>
{/await}