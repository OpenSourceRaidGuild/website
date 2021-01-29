import styled from '@emotion/styled'

const Tabs = styled.nav`
  display: flex;
  & > * + * {
    margin-left: var(--space-4);
  }
`

interface TabItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isSelected: boolean
}

const TabItem = styled.a`
  cursor: pointer;
  color: var(--black);
  font-weight: ${({ isSelected }: TabItemProps) =>
    isSelected ? '600' : '400'};
`

export { Tabs, TabItem }
