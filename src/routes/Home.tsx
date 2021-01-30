import Feedback from '#components/form'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <>
    <h1>Welcome to the Open Source Raid Guild!</h1>
    <Link to="/raids">Raids</Link>
    <Feedback />
  </>
)

export default Home
