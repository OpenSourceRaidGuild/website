import styled from '@emotion/styled'
import React from 'react'

type Props = {
  children: React.ReactNode
  placeInView: [
    isDisplayed: boolean,
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>,
  ]
}

function PopUp({ children, placeInView }: Props) {
  const [isDisplayed, setDisplay] = placeInView
  const clickListenerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        clickListenerRef.current &&
        clickListenerRef.current !== event.target
      ) {
        setDisplay(false)
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return isDisplayed ? (
    <$PopUp ref={clickListenerRef}>
      <button type="button" onClick={() => setDisplay(false)}>
        X
      </button>
      {children}
    </$PopUp>
  ) : null
}

export default PopUp

const $PopUp = styled.div`
  display: flex;
  flex-direction: column;
  place-items: flex-end;
  position: absolute;
  top: 0;
  button {
    border-radius: 50%;
    background: var(--gray-200);
    border: 4px solid var(--gray-200);
    height: 30px;
    text-align: center;
    margin-bottom: 5px;
  }
`
