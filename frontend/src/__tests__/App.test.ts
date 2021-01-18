import { render } from '@testing-library/svelte'
import App from '../App.svelte'

describe('<App>', () => {
	it('passes a smoke test without crashing', () => {
		render(App)
	})
})
