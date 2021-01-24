import React from 'react'
import Emoji from '.'

export default {
  title: 'Components/Emoji',
  component: Emoji,
  argTypes: {},
}

export const Rocket = () => <Emoji as="🚀" aria-label="Rocket" />
