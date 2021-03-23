import * as React from 'react'
import { loadingScreen, render, screen, userEvent } from './tests/testUtils'
import App, { AppRouter } from './App'
import { MemoryRouter } from 'react-router-dom'
import {
  fetchedCollectionData,
  fetchedDocumentData,
} from './tests/data/raidsData'
import Header from '#components/header'
import { Global } from '@emotion/react'
import { globalStyles } from './styles/globalStyles'

beforeAll(() => {
  jest.doMock('../utils/useDocument', () =>
    jest.fn().mockReturnValue(fetchedDocumentData),
  )
  jest.doMock('../utils/useCollection', () =>
    jest.fn().mockReturnValue(fetchedCollectionData),
  )
})
afterAll(() => {
  jest.resetAllMocks()
})

it('can view all raids and individual raids', async () => {
  render(<App />)
  userEvent.click(screen.getByTestId('raids'))

  // TODO improve this
  userEvent.click(screen.getAllByText('Raids')[0])

  await loadingScreen()

  const data = fetchedCollectionData.data

  data.forEach((s) =>
    expect(screen.getByText(`${s.title} | ${s.dungeon}`)).toBeInTheDocument(),
  )

  userEvent.click(screen.getByText(`${data[0].title} | ${data[0].dungeon}`))

  await loadingScreen()

  expect(
    screen.getByText(`${fetchedDocumentData.data.title}`),
  ).toBeInTheDocument()
})

it('shows 404 for missing pages', () => {
  render(
    <>
      <MemoryRouter
        initialEntries={[
          '/will-never-exist-but-if-it-does-it-is-probably-an-easter-egg',
        ]}
      >
        <Header />
        <AppRouter />
      </MemoryRouter>
      <Global styles={globalStyles} />
    </>,
  )

  expect(screen.getByText('Traveller, have you lost your way?'))
})
