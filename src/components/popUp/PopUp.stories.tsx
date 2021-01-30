import React from 'react'
import PopUp from '.'

export default {
  title: 'Components/Card',
  component: PopUp,
  argTypes: {},
}

export const Default = () => (
  <PopUp placeInView={{ isDisplayed: true, setDisplay: () => false }}>
    Hello World
  </PopUp>
)
