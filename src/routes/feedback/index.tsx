import styled from '@emotion/styled'
import React from 'react'

import PopUp from '../../components/popUp'

function Feedback() {
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
      <$Feedback>
        <h1>Feedback</h1>
        <form onSubmit={handleSubmit}>
          <$InputGroup>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" placeholder="Your name" />
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
      </$Feedback>
    </>
  )
}

export default Feedback

const $Feedback = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  place-items: center;
  place-content: center;
  background: var(--gray-300);
  width: 100%;

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
const $InputGroup = styled.div`
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

const $RadioGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  place-content: center;
  p {
    margin: 0;
    width: 100%;
  }
`
