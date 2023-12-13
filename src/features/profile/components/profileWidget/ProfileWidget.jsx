import React from 'react'
import "./profile-widget.css"
import societyImage from "./assets/images/societyImage.png"

const ProfileWidget = () => {
  return (
    <aside className="profile-widget">
      <div className="joined-societies-wrapper">
        <h3>Societies I Joined</h3>

        <ul className="joined-societies-list">
            <li className="society-item">
                <div>
                    <img src={societyImage} alt="society" />
                </div>

                <h4>Marital</h4>
            </li>
            <li className="society-item">
                <div className="">
                    <img src={societyImage} alt="society" />
                </div>

                <h4 className="">Marital</h4>
            </li>
        </ul>
      </div>
    </aside>
  )
}

export default ProfileWidget
