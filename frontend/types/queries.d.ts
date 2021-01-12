interface PullStats {
  createdAt: string
  additions: number
  deletions: number
  changedFiles: number
  commits: {
    totalCount: number
  }
}

interface CommitResult {
  pageInfo: {
    hasNextPage: boolean
    endCursor: string | null
  }
  nodes: Commit[]
}

interface Commit {
  oid: string
  additions: number
  deletions: number
  author: {
    user: {
      avatarUrl: string
      login: string
    }
  }
  parents: {
    totalCount
  }
  associatedPullRequests: {
    totalCount: number
    nodes: {
      baseRef: {
        repository: {
          nameWithOwner: string
        }
      }
    }[]
  }
}