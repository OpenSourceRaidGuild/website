import { GraphQLClient, gql } from 'graphql-request'

const client = new GraphQLClient('https://api.github.com/graphql', {
  headers: {
    authorization: `bearer ${import.meta.env.SNOWPACK_PUBLIC_GITHUB_PAT}`
  }
})

export const getRepoDetails = async (owner: string, repo: string, prid: number) => {
  const result = await client.request(
    gql`
      query pr($repo: String!, $owner: String!, $prid: Int!) {
        repository(name: $repo, owner: $owner) {
          pullRequest(number: $prid) {
            createdAt
            additions
            deletions
            changedFiles
            commits {
              totalCount
            }
          }
        }
      }
    `,
    {
      repo,
      owner,
      prid,
    }
  )

  return result.repository.pullRequest as PullStats
}

export const getAllUserStatsFromRepoSince = async(owner: string, repo: string, since: string, after: string | null): Promise<Commit[]> => {
  const result: CommitResult = (await client.request(
    gql`
    query commits($since: GitTimestamp!, $repo: String!, $owner: String!) {
      repository(name: $repo, owner: $owner) {
        defaultBranchRef  {
          target {
            ... on Commit {
              history(since: $since${after ? `, after: "${after}"` : ''}) {
                pageInfo {
                  hasNextPage
                  endCursor
                }
                nodes {
                  oid
                  message
                  additions
                  deletions
                  author {
                    user {
                      avatarUrl
                      login
                    }
                  }
                  parents {
                    totalCount
                  }
                  associatedPullRequests(first: 100) {
                    totalCount
                    nodes {
                      baseRef {
                        repository {
                          nameWithOwner
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    `,
    {
      since,
      repo,
      owner,
    }
  )).repository.defaultBranchRef.target.history

  return result.pageInfo.hasNextPage ? [...result.nodes, ...(await getAllUserStatsFromRepoSince(owner, repo, since, result.pageInfo.endCursor))] : result.nodes
}