import UserStatBlock from '.'

export default {
  title: 'Components/Card',
  component: UserStatBlock,
  argTypes: {},
}

export const Default = () => (
  <UserStatBlock
    rank={2}
    userStats={{
      userId: 1,
      user: 'Foo',
      avatarUrl: 'https://avatars3.githubusercontent.com/u/13718688?v=4',
      additions: 17,
      deletions: 90,
      commits: 1,
    }}
  />
)
