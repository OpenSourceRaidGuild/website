interface UserStats {
  userId: number
  user: string
  avatarUrl: string
  additions: number
  deletions: number
  commits: number
}

interface ViewRaidData {
  id: string
  dungeon: string
  title: string
  status: 'active' | 'completed'
  createdAt: number
  duration?: number
  additions: number
  deletions: number
  commits: number
  changedFiles: number
  contributors: {
    [key: number]: UserStats
  }
}
