import React from 'react'
import { NavLink } from 'react-router-dom'
import backgroundLogo from '../components/assets/bg_logo.svg'
import logo from '../components/assets/logo.svg'
import styled from '@emotion/styled'

const Home = () => {
  return (
    <$HomePageContainer>
      <$LeftContainer>
        <nav>
          <NavLink to="#">about us</NavLink>

          <NavLink to="/raids">our raids</NavLink>

          <NavLink to="#">our stats</NavLink>

          <NavLink to="#">contact us</NavLink>
        </nav>
        <$LeftContentWrapper>
          <section>
            <$MessageLine1>We love to</$MessageLine1>
            <$MessageLine2>code the</$MessageLine2>
            <$MessageLine3>future</$MessageLine3>
          </section>
          <$JoinUsButton type="button">join us</$JoinUsButton>
        </$LeftContentWrapper>
      </$LeftContainer>
      <$RightContainer>
        <$BackgroundContainer>
          <$OverlayLogo src={logo} alt="OS Raid Guild" />
        </$BackgroundContainer>
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
  display: flex;
  flex-direction: column;

  nav {
    display: flex;
    justify-content: space-evenly;

    a {
      text-transform: uppercase;
      text-decoration: none;
      color: #232323;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
    }
  }
`
const $RightContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: calc(100vh - 4rem);
  padding-top: 2rem;
`

const $BackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: url(${backgroundLogo}) no-repeat;
  background-size: contain;
  justify-content: center;
`

const $OverlayLogo = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  height: 400px;
  transform: translate(-5%, 23%);

  /* Large screens ----------- */
  @media only screen and (min-width: 1824px) {
    transform: translate(-20%, 25%);
  }
`

const $MessageLine1 = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  color: #888888;
`

const $MessageLine2 = styled.span`
  font-style: normal;
  font-weight: 900;
  font-size: 55px;
  text-transform: uppercase;
  color: #59c9e6;
`

const $MessageLine3 = styled.span`
  font-style: normal;
  font-weight: 900;
  font-size: 69px;
  text-transform: uppercase;
  color: #101c2e;
`

const $JoinUsButton = styled.button`
  border: 2px solid #101c2e;
  box-sizing: border-box;
  border-radius: 8px;
  width: 138px;
  height: 42px;
  text-transform: uppercase;
  cursor: pointer;
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
`

const $LeftContentWrapper = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-evenly;
  align-items: flex-start;
  padding-left: 6.5em;

  section {
    display: flex;
    flex-direction: column;
  }
`
export default Home
