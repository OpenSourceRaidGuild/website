interface ViewRaidData {
  id: number
  dungeon: string
  title: string
  additions: number
  deletions: number
  commits: number
  changedFiles: number
  contributors: {
    [key: number]: UserStats
  }
}
