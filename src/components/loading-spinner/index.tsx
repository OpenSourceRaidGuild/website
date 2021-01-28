import React from 'react'
import styled from '@emotion/styled'

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: hsla(0, 0%, 97%, 50%);
  z-index: 10;
`
const Ellipsis = styled.div`
  --ellipsisSize: 13px;
  --baseLeftPos: 8px;
  --animationSettings: 0.6s infinite;

  position: absolute;
  top: 50%;
  left: 50%;
  display: inline-block;
  width: 80px;
  height: var(--ellipsisSize);
  transform: translate(-50%, -50%);

  div {
    position: absolute;
    width: var(--ellipsisSize);
    height: var(--ellipsisSize);
    background: var(--gray-500);
    border-radius: 50%;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);

    &:nth-of-type(1) {
      left: var(--baseLeftPos);
      animation: lds-ellipsis1 var(--animationSettings);
    }
    &:nth-of-type(2) {
      left: var(--baseLeftPos);
      animation: lds-ellipsis2 var(--animationSettings);
    }
    &:nth-of-type(3) {
      left: calc(var(--baseLeftPos) * 4);
      animation: lds-ellipsis2 var(--animationSettings);
    }
    &:nth-of-type(4) {
      left: calc(var(--baseLeftPos) * 7);
      animation: lds-ellipsis3 var(--animationSettings);
    }
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
      transform: translate(calc(var(--baseLeftPos) * 3), 0);
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
