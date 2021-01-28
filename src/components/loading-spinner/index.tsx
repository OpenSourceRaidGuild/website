import React from 'react'
import styled from '@emotion/styled'

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
  --ellipsis-size: 13px;
  --base-left-pos: 8px;
  --animation-settings: 0.6s infinite;

  position: absolute;
  top: 50%;
  left: 50%;
  display: inline-block;
  width: 80px;
  height: var(--ellipsis-size);
  transform: translate(-50%, -50%);

  div {
    position: absolute;
    width: var(--ellipsis-size);
    height: var(--ellipsis-size);
    background: var(--gray-500);
    border-radius: 50%;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);

    &:nth-of-type(1) {
      left: var(--base-left-pos);
      animation: lds-ellipsis1 var(--animation-settings);
    }
    &:nth-of-type(2) {
      left: var(--base-left-pos);
      animation: lds-ellipsis2 var(--animation-settings);
    }
    &:nth-of-type(3) {
      left: calc(var(--base-left-pos) * 4);
      animation: lds-ellipsis2 var(--animation-settings);
    }
    &:nth-of-type(4) {
      left: calc(var(--base-left-pos) * 7);
      animation: lds-ellipsis3 var(--animation-settings);
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
      transform: translate(calc(var(--base-left-pos) * 3), 0);
    }
  }
`
