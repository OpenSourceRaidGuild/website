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
afterEach(() => {
  jest.resetAllMocks()
})

it('should renders and visits Raids then the first Link', async () => {
  render(<App />)

  userEvent.click(screen.getByRole('link', { name: 'Raids' }))

  await loadingScreen()

  const data = fetchedCollectionData.data

  expect(screen.getByText('Raids')).toBeInTheDocument()
  expect(screen.getByText('Active')).toBeInTheDocument()
  expect(screen.getByText('Completed')).toBeInTheDocument()

  const links = screen.getAllByRole('link')

  data.forEach((s) =>
    expect(screen.getByText(`${s.title} | ${s.dungeon}`)).toBeInTheDocument(),
  )
  userEvent.click(links[0])
  await loadingScreen()

  expect(
    screen.getByText(
      `${
        Object.keys(fetchedDocumentData.data.contributors).length
      } Contributors`,
    ),
  ).toBeInTheDocument()
  expect(
    screen.getByText(`${fetchedDocumentData.data.commits} Commits`),
  ).toBeInTheDocument()
  expect(
    screen.getByText(`${fetchedDocumentData.data.changedFiles} Changed Files`),
  ).toBeInTheDocument()
  expect(
    screen.getByText(
      `+${fetchedDocumentData.data.additions} -${fetchedDocumentData.data.deletions}`,
    ),
  ).toBeInTheDocument()
})
