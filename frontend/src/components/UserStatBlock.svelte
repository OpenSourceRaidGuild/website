<script lang='ts'>
  import { blur } from 'svelte/transition'

  export let rank: number
  export let userStats: UserStats

</script>

<style>
  .user-stat-block {
    margin-bottom: 1rem;
  }

  .user-stat-block a {
    background-color: white;
    border: 1px solid hsl(0, 0%, 78%);
    border-radius: 8px;
    padding: 1rem 2rem;
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: 3.75rem 6rem 8.365rem 3fr;
    grid-template-areas: "rank avatar name stats";
    text-decoration: none;
    color: initial;
    transition: box-shadow .2s ease-in-out, transform .2s ease-in-out;
  }

  .user-stat-block a:hover {
    box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
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

  .emoji-stat-light {
    font-size: 1.25rem;
    margin-right: 1rem;
    opacity: 0.8;
  }
</style>

<li class="user-stat-block" in:blur>
  <a href="https://github.com/{userStats.user}" target="_blank">
    <p class="rank">#{rank}</p>
    <img class="avatar" src="{userStats.avatarUrl}" alt="{userStats.user}'s Profile Image">
    <p class="name">{userStats.user}</p>
    <div class="stat-block">
      <p><span class="emoji-stat-light">⚔️️️️️️</span>+{userStats.additions}&emsp;-{userStats.deletions}</p>
      <p><span class="emoji-stat-light">💾</span>{userStats.commits} {userStats.commits === 1 ? 'Commit' : 'Commits'}</p>
      <p>{userStats.userId}</p>
    </div>
  </a>
</li>
