import React from 'react'
import { NavLink } from 'react-router-dom'
import backgroundLogo from '../assets/bg_logo.svg'
import logo from '../assets/logo.svg'
import styled from '@emotion/styled'

const HomePage = () => {
  return (
    <$HomePageContainer>
      <$LeftContainer>
        <header>
          <NavLink to="#">about us</NavLink>

          <NavLink to="#">our raids</NavLink>

          <NavLink to="#">our stats</NavLink>

          <NavLink to="#">contact us</NavLink>
        </header>
      </$LeftContainer>
      <$RightContainer>
        <$BackgroundOverlayContainer>
          <div>
            <img src={logo} alt="OS Raid Guild" />
          </div>
        </$BackgroundOverlayContainer>
        <$BackgroundContainer />
      </$RightContainer>
    </$HomePageContainer>
  )
}

const $HomePageContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const $LeftContainer = styled.section`
  flex-grow: 1;
  padding-top: 2rem;

  header {
    display: flex;
    justify-content: space-evenly;

    a {
      text-transform: uppercase;
      text-decoration: none;
      color: #232323;
    }
  }
`
const $RightContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  min-height: calc(100vh - 4rem);
  padding-top: 2rem;
`

const $BackgroundContainer = styled.div`
  display: flex;
  flex-grow: 1;
  background: url(${backgroundLogo}) no-repeat;
  background-size: contain;
`

const $BackgroundOverlayContainer = styled.div`
  position: relative;
  width: 100%;
  top: 36%;
  left: 25%;

  div {
    position: absolute;

    img {
      width: 22rem;
      height: 22rem;
    }
  }
`
export default HomePage
