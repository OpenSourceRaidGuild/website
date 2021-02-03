import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

async function loadingScreen() {
  expect(screen.getByLabelText('loadingScreen')).toBeInTheDocument()
  await waitForElementToBeRemoved(() =>
    screen.queryByLabelText('loadingScreen'),
  )
}

export * from '@testing-library/react'
export { userEvent, loadingScreen }
