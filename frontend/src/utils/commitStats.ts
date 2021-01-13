export const getStatsFromCommits = (raidRepoWithOwner: string, commits: Commit[] | undefined): UserStats[] => {
  if (!commits) return []
  return Object.values(commits.reduce<{ [key: string]: UserStats }>((stats, commit) => {
    if (
      !commit.author?.user?.login // Exclude null users
      || commit.parents.totalCount > 1 // Exclude Merge commits
      || commit.associatedPullRequests.nodes.filter(
          node => node.baseRef?.repository?.nameWithOwner !== raidRepoWithOwner
        ).length > 0 // Exclude commits from PRs not to the raid repo
    ) {
      // console.log(JSON.stringify(commit))
      return stats
    }

    if (commit.author.user.login in stats) {
      stats[commit.author.user.login].additions += commit.additions
      stats[commit.author.user.login].deletions += commit.deletions
      stats[commit.author.user.login].commits += 1
    } else {
      stats[commit.author.user.login] = {
        user: commit.author.user.login,
        avatarUrl: commit.author.user.avatarUrl,
        additions: commit.additions,
        deletions: commit.deletions,
        commits: 1,
      }
    }

    return stats
  }, {}))
}