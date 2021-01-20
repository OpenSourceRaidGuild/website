<script lang="ts">
  import { blur } from 'svelte/transition'
  import Card from './Card.svelte'

  export let rank: number
  export let userStats: UserStats

</script>

<Card let:className>
  <li class="user-stat-block" in:blur>
      <p class="rank">#{rank}</p>
      <a href="https://github.com/{userStats.user}" target="_blank">
        <img class="avatar" src="{userStats.avatarUrl}" alt="{userStats.user}'s Profile Image">
      </a>
      <a class="name" href="https://github.com/{userStats.user}" target="_blank">
        {userStats.user}
      </a>
      <div class="stat-block">
        <p><span class="emoji-stat-light">⚔️️️️️️</span>+{userStats.additions}&emsp;-{userStats.deletions}</p>
        <p><span class="emoji-stat-light">💾</span>{userStats.commits} {userStats.commits === 1 ? 'Commit' : 'Commits'}</p>
        <p>{userStats.userId}</p>
      </div>
  </li>
</Card>

<style>
  .user-stat-block {
    margin-bottom: 1rem;
    background-color: white;
    border: 1px solid hsl(0, 0%, 78%);
    border-radius: 8px;
    padding: 1rem 2rem;
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: 3.75rem 6rem 8.365rem 3fr;
    grid-template-areas: "rank avatar name stats";
  }

  .rank {
    font-size: 2rem;
    opacity: 0.8;
    grid-area: rank;
    align-self: center;
  }

  .avatar {
    border: solid 3px white;
    border-radius: 50%;
    width: 6rem;
    height: 6rem;
    grid-area: avatar;
    align-self: center;
  }

  .avatar:hover {
    border: double 3px hsl(0, 0%, 78%);
  }

  .name {
    grid-area: name;
    align-self: center;
    color: inherit;
    text-decoration: none;
  }

  .name:hover {
    text-decoration: underline;
  }

  .stat-block {
    grid-area: stats;
    align-self: center;
  }

  .emoji-stat-light {
    font-size: 1.25rem;
    margin-right: 1rem;
    opacity: 0.8;
  }
</style>
