import styled from '@emotion/styled'
import { NavLink, useLocation } from 'react-router-dom'

export default function Header() {
  const { pathname } = useLocation()

  const isHeaderPresent = () => {
    if (pathname === '/') {
      return null
    }
    return (
      <$Header>
        <strong>OSRG</strong>
        <$Nav>
          <ul>
            <li>
              <NavLink to="/" exact activeStyle={{ color: 'var(--black)' }}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/raids"
                exact
                activeStyle={{ color: 'var(--black)' }}
              >
                Raids
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                exact
                activeStyle={{ color: 'var(--black)' }}
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </$Nav>
      </$Header>
    )
  }
  return <>{isHeaderPresent()}</>
}

const $Header = styled('header')`
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: var(--space-5);
  background-color: var(--white);
  border-bottom: 1px solid var(--line-color);
  box-shadow: 0 2px 4px 0 var(--elevation-1);
`
const $Nav = styled('nav')`
  ul {
    display: flex;
    align-items: center;

    list-style: none;
  }

  ul > li + li {
    margin-left: var(--space-4);
  }

  ul li a {
    color: var(--gray-400);
    text-decoration: none;
  }
`
