interface UserStats {
  userId: number
  user: string
  avatarUrl: string
  additions: number
  deletions: number
  commits: number
}

interface ViewRaidData {
  title: string
  additions: number
  deletions: number
  commits: number
  changedFiles: number
  contributors: {
    [key: number]: UserStats
  }
}