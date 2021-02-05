import Feedback from '#components/feedback'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <>
    <div role="banner">
      <Feedback />
    </div>
    <div role="navigation">
      <Link to="/raids">Raids</Link>
    </div>

    <div role="main">
      <h1>Welcome to the Open Source Raid Guild!</h1>
    </div>
  </>
)

export default Home
