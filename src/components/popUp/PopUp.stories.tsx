import React from 'react'
import PopUp from '.'

export default {
  title: 'Components/Card',
  component: PopUp,
  argTypes: {},
}

export const Default = () => (
  <PopUp placeInView={[true, () => false]}>Hello World</PopUp>
)
