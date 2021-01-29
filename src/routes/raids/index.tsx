import React from 'react'
import { Link } from 'react-router-dom'
import LoadingSpinner from '#components/loading-spinner'
import useCollection from '#utils/useCollection'
import { Tabs, TabItem } from '#components/tabs/Tabs'
import styled from '@emotion/styled'

type Tab = {
  value: string
  title: string
}

const tabs: Tab[] = [
  { title: 'Active', value: 'active' },
  { title: 'Completed', value: 'completed' },
]

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  padding: var(--space-7) var(--space-4);
  flex-direction: row-reverse;
  @media (max-width: 640px) {
    flex-direction: column;
  }
  & > * + * {
    margin-bottom: var(--space-5);
  }
`

const Raids = styled.ul`
  padding: var(--space-4) 0;
  & > * + * {
    margin-top: var(--space-4);
  }
`

const Raid = styled.li`
  background: white;
  width: 25rem;
  @media (max-width: 640px) {
    width: 18rem;
  }
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: var(--space-4);
`

const Input = styled.input`
  padding: 10px;
  width: 300px;
`

interface FormElements extends HTMLFormControlsCollection {
  dungeonInput: HTMLInputElement
}
interface FilterFormElements extends HTMLFormElement {
  readonly elements: FormElements
}

const AllRaids = () => {
  const collectionData = useCollection<ViewRaidData>('raid-stats')
  const [currentTab, setCurrentTab] = React.useState(tabs[0].value)
  const [dungeon, setDungeon] = React.useState('')

  if (collectionData.state === 'success') {
    const data = collectionData.data
    const dataInCurrentTab = data.filter((r) => r.status === currentTab)
    const filteredData = dungeon
      ? dataInCurrentTab.filter((r) => r.dungeon.includes(dungeon))
      : dataInCurrentTab

    return (
      <Container>
        <div>
          <h3>Filters</h3>
          <form
            onSubmit={(e: React.SyntheticEvent<FilterFormElements>) => {
              e.preventDefault()
              setDungeon(e.currentTarget.elements.dungeonInput.value)
            }}
          >
            <div>
              <label
                htmlFor="dungeonInput"
                className="block text-sm font-medium text-gray-700"
              >
                Dungeon
              </label>
              <div>
                <Input
                  type="text"
                  id="dungeonInput"
                  placeholder="hospitalrun/hospitalrun-frontend"
                />
              </div>
            </div>
          </form>
        </div>

        <div>
          <h1>Raids</h1>
          <Tabs aria-label="Tabs">
            {tabs.map((tab: Tab) => (
              <TabItem
                key={tab.value}
                isSelected={tab.value === currentTab}
                {...(tab.value === currentTab
                  ? { 'aria-current': 'page' }
                  : {})}
                onClick={() => setCurrentTab(tab.value)}
              >
                {tab.title}
              </TabItem>
            ))}
          </Tabs>

          <Raids>
            {filteredData.map((s) => (
              <Raid key={s.id}>
                <h5>{s.title}</h5>
                <Link to={`/raids/${s.id}`}>{s.dungeon}</Link>
              </Raid>
            ))}
            {filteredData.length === 0 && (
              <Raid>
                <span role="img" aria-label="cross">
                  ❌
                </span>
                <span> No raids here </span>
                <span role="img" aria-label="cross">
                  ❌
                </span>
              </Raid>
            )}
          </Raids>
        </div>
      </Container>
    )
  } else {
    return collectionData.state === 'loading' ? (
      <LoadingSpinner />
    ) : (
      // Theoretically this can/should never be hit... But a fun message nonetheless
      <p>
        {`Strange... I could've sworn the Manticore was here a second ago! Seems
        there aren't any Raids right now. Try again later!`}
      </p>
    )
  }
}

export default AllRaids
