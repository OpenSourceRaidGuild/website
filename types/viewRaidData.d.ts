interface UserStats {
  userId: number
  user: string
  avatarUrl: string
  additions: number
  deletions: number
  commits: number
}

interface Raid {
  dungeon: string
  title: string
  status: 'active' | 'completed'
  additions: number
  deletions: number
  commits: number
  changedFiles: number
  contributors: {
    [key: number]: UserStats
  }
}
