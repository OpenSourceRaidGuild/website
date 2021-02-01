/*eslint no-irregular-whitespace: ["error", { "skipTemplates": true }]*/
import * as React from 'react'
import { loadingScreen, render, screen, userEvent } from '../tests/testUtils'
import App from '../App'
import {
  fetchedCollectionData,
  fetchedDocumentData,
} from '../tests/data/raidsData'

// Note: After each Test Jest doesn't un-mount `The Component` Thats why we don't need to re-visit the page every time

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
const data = fetchedDocumentData.data

it('should test the ViewRaid $TotalStats', async () => {
  render(<App />)

  userEvent.click(screen.getByText('Raids'))

  await loadingScreen()

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

  const contributorsList = screen.getAllByRole('listitem')

  userEvent.click(screen.getByRole('combobox'))
  userEvent.click(screen.getByText('additions'))

  Object.values(data.contributors)
    .sort((a, b) => b.additions - a.additions)
    .forEach((contributor, index) => {
      // 4 is for the 4 list items of $TotalStats
      const commitAmount = contributor.commits > 1 ? 'Commits' : 'Commit'
      expect(screen.getByAltText(`${contributor.user}'s avatar`)).toBeTruthy()
      expect(contributorsList[index + 4]).toContainHTML(
        `<span class="css-weeu1d">#${index + 1}</span>`,
      )
      expect(
        screen.getByRole('link', { name: contributor.user }),
      ).toBeInTheDocument()
      expect(contributorsList[index + 4]).toContainHTML(
        `+${contributor.additions} -${contributor.deletions}`,
      )
      expect(contributorsList[index + 4]).toContainHTML(
        `${contributor.commits} ${commitAmount}`,
      )
    })
})
it('should Sort ViewRaid By Commits', async () => {
  render(<App />)

  const contributorsList = screen.getAllByRole('listitem')

  userEvent.click(screen.getByRole('combobox'))
  userEvent.click(screen.getByText('commits'))

  expect(screen.getAllByRole('img')).toBeTruthy()

  Object.values(data.contributors)
    .sort((a, b) => b.commits - a.commits)
    .forEach((contributor, index) => {
      // 4 is for the 4 list items of $TotalStats
      const commitAmount = contributor.commits > 1 ? 'Commits' : 'Commit'
      expect(contributorsList[index + 4]).toContainHTML(
        `<span class="css-weeu1d">#${index + 1}</span>`,
      )
      expect(
        screen.getByRole('link', { name: contributor.user }),
      ).toBeInTheDocument()
      expect(contributorsList[index + 4]).toContainHTML(
        `+${contributor.additions} -${contributor.deletions}`,
      )
      expect(contributorsList[index + 4]).toContainHTML(
        `${contributor.commits} ${commitAmount}`,
      )
    })
})
it('should Sort ViewRaid By Deletions', async () => {
  render(<App />)

  const contributorsList = screen.getAllByRole('listitem')

  userEvent.click(screen.getByRole('combobox'))
  userEvent.click(screen.getByText('deletions'))

  Object.values(data.contributors)
    .sort((a, b) => b.deletions - a.deletions)
    .forEach((contributor, index) => {
      // 4 is for the 4 list items of $TotalStats
      const commitAmount = contributor.commits > 1 ? 'Commits' : 'Commit'
      expect(contributorsList[index + 4]).toContainHTML(
        `<span class="css-weeu1d">#${index + 1}</span>`,
      )
      expect(
        screen.getByRole('link', { name: contributor.user }),
      ).toBeInTheDocument()
      expect(contributorsList[index + 4]).toContainHTML(
        `+${contributor.additions} -${contributor.deletions}`,
      )
      expect(contributorsList[index + 4]).toContainHTML(
        `${contributor.commits} ${commitAmount}`,
      )
    })
})
