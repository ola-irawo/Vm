import React from 'react'
import "./profile.css"
import { ProfileCard, ProfileFeed, ProfileWidget } from '../../features/profile/index'

const Profile = () => {
  return (
    <main className="profile-container">
      <div className="profile-layout">
        <ProfileCard />
        <ProfileFeed />
      </div>
      <ProfileWidget />
    </main>
  )
}

export default Profile
