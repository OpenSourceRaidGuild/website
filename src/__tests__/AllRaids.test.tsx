import { loadingScreen, render, screen, userEvent } from './helpers/testUtils'
import App from '../App'
import { fetchedCollectionData } from './helpers/data/raidsData'

beforeAll(() => {
  jest.doMock('../utils/useCollection', () =>
    jest.fn().mockReturnValue(fetchedCollectionData),
  )
})
afterAll(() => {
  jest.resetAllMocks()
})

it('should AllRaids links', async () => {
  render(<App />)
  userEvent.click(screen.getByTestId('raids'))
  await loadingScreen()

  userEvent.click(screen.getAllByText('Raids')[1])

  expect(screen.getByText('Active')).toBeInTheDocument()
  expect(screen.getByText('Completed')).toBeInTheDocument()

  const data = fetchedCollectionData.data
  data.forEach((s) =>
    expect(screen.getByText(`${s.title} | ${s.dungeon}`)).toBeInTheDocument(),
  )
})
