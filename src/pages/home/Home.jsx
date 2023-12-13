import React from 'react'
import "./home.css"
import { HomeWidget, UserPost } from '../../features/home/index'
import PostInput from '../../components/postInput/PostInput'
import useWindowWidth from '../../hooks/useWindowWidth'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const {screenWidth} = useWindowWidth()
  const isDesktop = screenWidth >= 768
  const location = useLocation()
  return (
    <main className="home-container">
      <div className="home-layout">
        <UserPost />
      </div>
      <HomeWidget />
      {isDesktop && <PostInput/> }
    </main>
  )
}

export default Home
