/** @jsx jsx */
import * as React from 'react'
import { css, jsx } from '@emotion/react'

import { Link, useRouteMatch } from 'react-router-dom'
import LoadingSpinner from '#components/loadingSpinner'
import useCollection from '#utils/useCollection'
import type { WithID } from '#utils/useCollection'
import styled from '@emotion/styled'
import useFilter from '#utils/useFilter'

enum Tabs {
  active,
  completed,
}

function filterByDungon(raids: RaidStats[], dungeon: string) {
  return raids.filter((raid) => raid.dungeon.includes(dungeon))
}

function AllRaids() {
  const { data, error, loading } = useCollection<RaidStats>('raid-stats')
  const [tab, setTab] = React.useState<Tabs>(Tabs.active)

  // @ts-expect-error issue with type merging and interfaces https://github.com/microsoft/TypeScript/issues/15300
  const [results, setFilterText] = useFilter<typeof data[0]>(
    data ?? [],
    filterByDungon,
  )

  const handleTabChange = (nextTab: Tabs): React.MouseEventHandler => () => {
    setTab(nextTab)
  }

  const getTabProps = (nextTab: Tabs) => ({
    active: tab == nextTab,
    className: 'tab',
    onClick: handleTabChange(nextTab),
  })

  if (loading) return <LoadingSpinner />
  if (error)
    return (
      <p>
        {`Strange... I could've sworn the Manticore was here a second ago! Seems
        there aren't any Raids right now. Try again later!`}
      </p>
    )

  return (
    <div css={{ maxWidth: 1024, margin: '0 auto', display: 'flex' }}>
      <div css={{ flex: '2 1 0' }}>
        <$Title>Raids</$Title>
        <$Tabs css={{ marginTop: 'var(--space-4)' }}>
          <$Tab {...getTabProps(Tabs.active)}>Active</$Tab>
          <$Tab {...getTabProps(Tabs.completed)}>Complete</$Tab>
        </$Tabs>
        {tab === Tabs.active && (
          <RaidsSelection
            raids={results.filter((raid) => raid.status === 'active')}
          />
        )}
        {tab === Tabs.completed && (
          <RaidsSelection
            raids={results.filter((raid) => raid.status === 'completed')}
          />
        )}
      </div>
      <div
        css={css`
          flex: 1 1 0;
          display: none;
          @media (min-width: 768px) {
            display: block;
          }
        `}
      >
        <FilterAside setFilterValue={setFilterText} />
      </div>
    </div>
  )
}

const github = (repo: string) => `https://github.com/${repo}`

interface RaidsSelectionProps {
  raids: WithID<RaidStats>[]
}

function RaidsSelection(props: RaidsSelectionProps) {
  const { raids } = props

  return (
    <div css={{ marginTop: 'var(--space-4)' }}>
      {raids.map((raid) => (
        <RaidCard key={raid.id} raid={raid} />
      ))}
    </div>
  )
}

interface RaidCardProps {
  raid: WithID<RaidStats>
}

function RaidCard(props: RaidCardProps) {
  const { raid } = props
  const { url } = useRouteMatch()
  return (
    <$RaidCard key={raid.id}>
      <$Link to={`${url}/${raid.id}`} />
      <div>
        <h3>{raid.title}</h3>
        <a href={github(raid.dungeon)} target="_blank" rel="noreferrer">
          {raid.dungeon}
        </a>
      </div>
    </$RaidCard>
  )
}

interface FilterAsideProps {
  setFilterValue(filterValue: string): void
}
function FilterAside(props: FilterAsideProps) {
  const { setFilterValue } = props

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFilterValue(e.currentTarget.value)
  }

  return (
    <$Aside>
      <h3>Filters</h3>
      <div css={{ marginTop: 'var(--space-4)' }}>
        <label htmlFor="dungeon fiter">
          Dungeon
          <$Input
            placeholder="facebook/react"
            name="dungeon filter"
            onChange={handleChange}
          />
        </label>
      </div>
    </$Aside>
  )
}

export default AllRaids

const $Title = styled.h1`
  padding-left: var(--space-4);
  margin-top: var(--space-4);
`
interface $TabProps {
  active: boolean
}
const $Tab = styled.button<$TabProps>`
  all: unset;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  cursor: pointer;
  text-align: center;
  font-weight: ${(props) => (props.active ? 700 : 'inherit')};
  & + & {
    margin-left: var(--space-2);
  }
  @media (min-width: 768px) {
    text-align: left;
  }
`
const $Tabs = styled.div`
  display: flex;
  max-width: 425px;
  & > .tab + .tab {
    margin-left: var(--space-2);
  }
  @media (min-width: 768px) {
    margin-left: var(--space-4);
  }
`
const $Link = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &:active {
    background: var(--gray-100);
  }
`
const $RaidCard = styled.div`
  position: relative;
  box-sizing: border-box;
  & + & {
    margin-top: var(--space-3);
  }
  width: 100%;
  max-width: 425px;
  cursor: pointer;
  background: var(--white);
  border: 1px solid var(--gray-500);
  padding: var(--space-4);
  padding-bottom: var(--space-5);
  box-shadow: var(--elevation-1);
  transition: box-shadow 300ms ease-in-out;
  & > div {
    position: relative;
    pointer-events: none;
    z-index: 1;
    h3 {
      font-size: var(--h4);
      line-height: 2;
    }
    a {
      margin-top: var(--space-5);
      color: var(--gray-400);
      text-decoration: none;
      padding: 2px;
      pointer-events: all;
      &:hover {
        border-bottom: 1px blue solid;
        color: blue;
      }
    }
  }
  &:hover {
    box-shadow: var(--elevation-2);
  }
  @media (min-width: 768px) {
    margin-left: var(--space-4);
  }
`

const $Input = styled.input`
  all: unset;
  line-height: 2;
  border: 1px solid var(--gray-500);
  padding-left: var(--space-2);
  width: 100%;
  background: var(--white);
  &::placeholder {
    color: var(--gray-200);
  }
`

const $Aside = styled.aside`
  padding: var(--space-4);
  label {
    margin-top: var(--space-4);
  }
  label input {
    margin-top: var(--space-2);
    display: block;
    max-width: 330px;
  }
`
