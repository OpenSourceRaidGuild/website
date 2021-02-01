import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

async function loadingScreen() {
  expect(screen.getByLabelText('loading')).toBeInTheDocument()
  await waitForElementToBeRemoved(() => screen.queryByLabelText('loading'))
}

export * from '@testing-library/react'
export { userEvent, loadingScreen }
