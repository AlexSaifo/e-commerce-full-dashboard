import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/LandingPage/Navbar'

const LandingPageRootLayout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default LandingPageRootLayout
