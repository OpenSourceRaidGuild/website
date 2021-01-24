import * as React from 'react'
import styled from '@emotion/styled'

const Background = styled.div`
  background-color: hsla(0, 0%, 97%, 50%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
const Ellipsis = styled.div`
  display: inline-block;
  position: absolute;
  z-index: 1;
  width: 80px;
  height: 80px;
  left: calc(50% - 40px);
  top: calc(50% - 40px);

  & div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: hsl(0, 0%, 25%);
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  & div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }

  & div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }

  & div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }

  & div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }

  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`

export default function LoadingSpinner() {
  return (
    <Background>
      <Ellipsis>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Ellipsis>
    </Background>
  )
}
