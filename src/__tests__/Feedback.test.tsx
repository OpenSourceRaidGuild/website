import { render, screen, userEvent } from '../tests/testUtils'
import faker from 'faker'
import App from '../App'
import {
  fetchedCollectionData,
  fetchedDocumentData,
} from '../tests/data/raidsData'

const buildFeedback = {
  name: faker.name.firstName(),
  repoName: faker.commerce.productName(),
  description: faker.lorem.paragraph(10),
  rating: Math.round(faker.random.number({ min: 1, max: 5 })),
}

beforeAll(() => {
  jest.doMock('../utils/useDocument', () =>
    jest.fn().mockReturnValue(fetchedDocumentData),
  )
  jest.doMock('../utils/useCollection', () =>
    jest.fn().mockReturnValue(fetchedCollectionData),
  )
  jest.spyOn(console, 'log')
})
afterAll(() => {
  jest.resetAllMocks()
})

// Skipping for now as need to wait for UX to place feedback button on home screen.
it.skip('should renders and visits Raids then the first Link', async () => {
  render(<App />)
  userEvent.click(screen.getByText('Feedback'))

  expect(screen.getByLabelText('3')).toBeChecked()
  userEvent.type(screen.getByPlaceholderText('Your name'), buildFeedback.name)
  userEvent.type(
    screen.getByPlaceholderText('Repo name'),
    buildFeedback.repoName,
  )
  // Both didn't work
  // fireEvent.change(
  //   screen.getByLabelText(`${buildFeedback.rating}`),
  //   `${buildFeedback.rating}`,
  // )

  // userEvent.selectOptions(
  //   screen.getByRole('radiogroup'),
  //   `${buildFeedback.rating}`,
  // )

  userEvent.click(screen.getByText(`${buildFeedback.rating}`))

  userEvent.type(
    screen.getByLabelText('Description'),
    buildFeedback.description,
  )
  expect(screen.getByPlaceholderText('Your name')).toHaveDisplayValue(
    buildFeedback.name,
  )
  expect(screen.getByPlaceholderText('Repo name')).toHaveDisplayValue(
    buildFeedback.repoName,
  )
  expect(screen.getByLabelText('Description')).toHaveDisplayValue(
    buildFeedback.description,
  )
  expect(screen.getByLabelText(`${buildFeedback.rating}`)).toBeChecked()

  userEvent.click(screen.getByText('Submit'))
})
