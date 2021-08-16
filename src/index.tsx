import { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import App from './App'

const HoneyPotForm = () => (
  <form
    name="contact-us"
    data-netlify="true"
    netlify-honeypot="bot-field"
    hidden
  >
    <input hidden type="text" name="name" />
    <input hidden type="email" name="email" />
    <textarea hidden name="message"></textarea>
  </form>
)

ReactDOM.render(
  <StrictMode>
    <HoneyPotForm />
    <App />
  </StrictMode>,
  document.getElementById('root'),
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
if (import.meta.hot) {
  import.meta.hot.accept()
}
