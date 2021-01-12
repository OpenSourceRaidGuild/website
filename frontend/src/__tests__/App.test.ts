import { render, screen } from '@testing-library/svelte'
import App from '../App.svelte'

describe('<App>', () => {
  it('renders learn svelte link', () => {
    render(App)
    expect(screen.getByText(/learn svelte/i)).toBeInTheDocument()
  })
})
