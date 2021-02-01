import * as React from 'react'
import { loadingScreen, render, screen, userEvent } from '../tests/testUtils'
import App from '../App'
import {
  fetchedCollectionData,
  fetchedDocumentData,
} from '../tests/data/raidsData'

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

  userEvent.click(screen.getByText('Raids'))

  await loadingScreen()

  const data = fetchedCollectionData.data

  expect(screen.getByText('Raids')).toBeInTheDocument()

  data.forEach((s) =>
    expect(screen.getByText(`${s.title} | ${s.dungeon}`)).toBeInTheDocument(),
  )

  userEvent.click(screen.getByText(`${data[0].title} | ${data[0].dungeon}`))

  await loadingScreen()

  expect(
    screen.getByText(`${fetchedDocumentData.data.title}`),
  ).toBeInTheDocument()
})
