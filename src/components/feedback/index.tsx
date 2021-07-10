import styled from '@emotion/styled'
import * as React from 'react'

import PopUp from '../popUp'

function Feedback() {
  const [isDisplayed, setDisplay] = React.useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    e.currentTarget as typeof e.currentTarget & {
      name: { value: string }
      raidName: { value: string }
      rate: { value: string }
      description: { value: string }
    }
  }

  return (
    <>
      <$Button type="button" onClick={() => setDisplay(!isDisplayed)}>
        Feedback
      </$Button>
      <$Feedback>
        <PopUp placeInView={{ isDisplayed, setDisplay }}>
          <span>Feedback</span>
          <form onSubmit={handleSubmit}>
            <$InputGroup>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your name"
              />
            </$InputGroup>
            <$InputGroup>
              <label htmlFor="raidName">Raid name</label>
              <input
                type="text"
                name="raidName"
                id="raidName"
                placeholder="Repo name"
              />
            </$InputGroup>
            <$RadioGroup role="radiogroup">
              <p>Rate the Raid || Raid Rating</p>
              <input type="radio" value="common" name="rate" id="rate1" />
              <label htmlFor="rate1">1</label>
              <input type="radio" value="fine" name="rate" id="rate2" />
              <label htmlFor="rate2">2</label>
              <input
                type="radio"
                value="superior"
                name="rate"
                id="rate3"
                defaultChecked
              />
              <label htmlFor="rate3">3</label>
              <input type="radio" value="epic" name="rate" id="rate4" />
              <label htmlFor="rate4">4</label>
              <input type="radio" value="legendary" name="rate" id="rate5" />
              <label htmlFor="rate5">5</label>
            </$RadioGroup>
            <$InputGroup>
              <label htmlFor="description">Description</label>
              <textarea name="description" id="description" />
            </$InputGroup>
            <button type="submit">Submit</button>
          </form>
        </PopUp>
      </$Feedback>
    </>
  )
}

export default Feedback

const $Button = styled('button')`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px 18px;
  border-radius: var(--roundness);
  border: 4px solid var(--gray-200);
`

const $Feedback = styled('div')`
  display: flex;
  flex-wrap: wrap;
  place-items: center;
  place-content: center;
  background: var(--gray-300);
  width: 100%;

  span {
    font-size: var(--h5);
    border-bottom: 0;
    background: var(--gray-200);
    width: 100%;
    display: block;
    text-align: center;
    padding: 4px 0;
    border-top-left-radius: var(--roundness);
    border-top-right-radius: var(--roundness);
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 12px;
    border: 4px solid var(--gray-200);
    padding: 10px 19px;
    border-bottom-left-radius: var(--roundness);
    border-bottom-right-radius: var(--roundness);
    button {
      border: 4px solid var(--gray-200);
      background: var(--gray-200);
      border-radius: var(--roundness);
    }
  }
`
const $InputGroup = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 5px;
  input,
  textarea {
    padding: 8px;
    border-radius: var(--roundness);
    border: 1px solid var(--gray-300);
  }
`

const $RadioGroup = styled('div')`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  place-content: center;
  p {
    margin: 0;
    width: 100%;
  }
`
