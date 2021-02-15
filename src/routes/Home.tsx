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
          <NavLink data-testid="raids" to="/raids">
            our raids
          </NavLink>
          <NavLink to="#">our stats</NavLink>
          <NavLink to="#">contact us</NavLink>
          <NavLink to="/feedback">feedback</NavLink>
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
          <$OverlayLogo />
        </$BackgroundContainer>
      </$RightContainer>
    </$HomePageContainer>
  )
}

const $HomePageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const $LeftContainer = styled.section`
  flex-grow: 1;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;

  nav {
    display: flex;
    justify-content: space-around;

    a {
      text-transform: uppercase;
      text-decoration: none;
      color: #232323;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
    }
    @media only screen and (min-width: 600px) {
      padding-left: 1rem;
    }
  }
`
const $RightContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: 2rem;
`

const $BackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: url(${backgroundLogo}) no-repeat;
  background-size: contain;
  justify-content: center;
  width: 800px;
  height: 800px;
`

const $OverlayLogo = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  background: url(${logo}) no-repeat;
  background-size: contain;
  width: 300px;
  height: 400px;
  transform: translate(-15%, 28%);
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
  color: #3e99b0;
`

const $MessageLine3 = styled.h1`
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
  padding-left: 5em;

  section {
    display: flex;
    flex-direction: column;
  }
`
export default Home
