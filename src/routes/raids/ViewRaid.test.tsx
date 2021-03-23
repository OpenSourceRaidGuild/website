import * as React from 'react'
import { loadingScreen, render, screen, userEvent } from '../../tests/testUtils'
import App from '../../App'
import {
  fetchedCollectionData,
  fetchedDocumentData,
} from '../../tests/data/raidsData'

beforeAll(() => {
  jest.doMock('../../utils/useDocument', () =>
    jest.fn().mockReturnValue(fetchedDocumentData),
  )
  jest.doMock('../../utils/useCollection', () =>
    jest.fn().mockReturnValue(fetchedCollectionData),
  )
})
afterAll(() => {
  jest.resetAllMocks()
})
const data = fetchedDocumentData.data

it('should test the ViewRaid $TotalStats', async () => {
  render(<App />)
  userEvent.click(screen.getByTestId('raids'))

  await loadingScreen()

  // TODO is there a better query?
  userEvent.click(
    screen.getByText(
      `${fetchedCollectionData.data[0].title} | ${fetchedCollectionData.data[0].dungeon}`,
    ),
  )
  await loadingScreen()

  expect(
    screen.getByText(`${Object.keys(data.contributors).length} Contributors`),
  ).toBeInTheDocument()
  expect(screen.getByText(`${data.commits} Commits`)).toBeInTheDocument()
  expect(
    screen.getByText(`${data.changedFiles} Changed Files`),
  ).toBeInTheDocument()
  expect(
    screen.getByText(`+${data.additions} -${data.deletions}`),
  ).toBeInTheDocument()
})
it('should Sort ViewRaid By Addition', async () => {
  render(<App />)
  userEvent.selectOptions(screen.getByRole('combobox'), 'additions')

  Object.values(data.contributors)
    .sort((a, b) => b.additions - a.additions)
    .forEach((contributor) => {
      const commitAmount = contributor.commits > 1 ? 'Commits' : 'Commit'
      expect(screen.getByAltText(`${contributor.user}'s avatar`)).toBeTruthy()
      expect(screen.getByText(contributor.user)).toBeInTheDocument()

      expect(
        screen.getByText(`${contributor.commits} ${commitAmount}`),
      ).toBeInTheDocument()
    })
})
it('should Sort ViewRaid By Commits', async () => {
  render(<App />)

  // const contributorsList = screen.getAllByRole('listitem')

  userEvent.selectOptions(screen.getByRole('combobox'), 'commits')

  Object.values(data.contributors)
    .sort((a, b) => b.commits - a.commits)
    .forEach((contributor) => {
      // 4 is for the 4 list items of $TotalStats
      const commitAmount = contributor.commits > 1 ? 'Commits' : 'Commit'
      // expect(contributorsList[index + 4]).toContainHTML(`#${index + 1}`)
      expect(screen.getByText(contributor.user)).toBeInTheDocument()
      // expect(contributorsList[index + 4]).toContainHTML(
      // `+${contributor.additions} -${contributor.deletions}`,
      // )
      expect(
        screen.getByText(`${contributor.commits} ${commitAmount}`),
      ).toBeInTheDocument()
    })
})
it('should Sort ViewRaid By Deletions', async () => {
  render(<App />)

  // const contributorsList = screen.getAllByRole('listitem')

  // userEvent.selectOptions(screen.getByRole('combobox'), 'deletions')

  Object.values(data.contributors)
    .sort((a, b) => b.deletions - a.deletions)
    .forEach((contributor) => {
      // 4 is for the 4 list items of $TotalStats
      const commitAmount = contributor.commits > 1 ? 'Commits' : 'Commit'
      // expect(contributorsList[index + 4]).toContainHTML(`#${index + 1}`)
      expect(screen.getByText(contributor.user)).toBeInTheDocument()
      // expect(contributorsList[index + 4]).toContainHTML(
      //   `+${contributor.additions} -${contributor.deletions}`,
      // )
      expect(
        screen.getByText(`${contributor.commits} ${commitAmount}`),
      ).toBeInTheDocument()
    })
})
