import React from 'react'
import "./societies.css"
import { SocietiesList } from '../../features/societies'
import SocietyWidget from '../../features/societies/components/societyWidget/SocietyWidget'

const Societies = () => {
  return (
    <main className="society-container">
      <div className="society-layout">
        <SocietiesList />
      </div>
    </main>
  )
}

export default Societies
