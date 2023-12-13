import React from 'react'
import "./navigation-menu.css"
import { NavLink } from 'react-router-dom'
import homeIcon from "./assets/svgs/home.svg"
import societiesIcon from "./assets/svgs/societies.svg"
import messageIcon from "./assets/svgs/message.svg"
import notificationIcon from "./assets/svgs/notification.svg"
import bookmarkIcon from "./assets/svgs/bookmark.svg"
import profileIcon from "./assets/svgs/profileIcon.svg"
import settingsIcon from "./assets/svgs/settingsIcon.svg"
import loginIcon from "./assets/svgs/loginIcon.svg"
import BrandLogo from '../../components/brandLogo/BrandLogo'
import useWindowWidth from '../../hooks/useWindowWidth'
import { Logout } from '../../features/authentication'

const NavigationMenu = () => {
    const {screenWidth} = useWindowWidth()

    const isMobile = screenWidth <= 767
    const isDesktop = screenWidth >= 1306
  return (
    <nav className="primary-navigation" aria-label="Primary Navigation - Explore various sections" role="navigation" typeof="schema:SiteNavigationElement">
       {!isMobile && <BrandLogo />}

      <ul className="nav-list">
        <li className="nav-list-item">
            <NavLink to={"/home"}>
                <img src={homeIcon} alt="A home icon representing the home page" />
               {isDesktop && <p>Home</p>}
            </NavLink>
        </li>
        <li className="nav-list-item">
            <NavLink to={"/societies"}>
                <img src={societiesIcon} alt="Societies Icon - Explore societies" />
               {isDesktop && <p>Societies</p>}
            </NavLink>
        </li>
        <li className="nav-list-item">
            <NavLink>
                <img src={messageIcon} alt="A message icon representing the message page" />
              {isDesktop &&  <p>Message</p>}
            </NavLink>
        </li>
        <li className="nav-list-item">
            <NavLink>
                <img src={notificationIcon} alt="Notification Icon - View notifications" />
              { isDesktop && <p>Notification</p>}
            </NavLink>
        </li>
        <li className="nav-list-item">
            <NavLink to={"/profile"}>
                <img src={profileIcon} alt="Bookmark Icon - Manage bookmarks" />
              {isDesktop &&  <p>Profile</p>}
            </NavLink>
        </li>
        {!isMobile && <li className="nav-list-item">
            <NavLink>
                <img src={bookmarkIcon} alt="Bookmark Icon - Manage bookmarks" />
              { isDesktop && <p>Bookmarks</p>}
            </NavLink>
        </li>}
      </ul>

     {!isMobile && <ul className="nav-list">
        <li className="nav-list-item">
                <NavLink>
                    <img src={settingsIcon} alt="Bookmark Icon - Manage bookmarks" />
                  {isDesktop &&  <p>Settings</p>}
                </NavLink>
            </li>
            <li className="nav-list-item">
                <NavLink>
                    <img src={loginIcon} alt="Bookmark Icon - Manage bookmarks" />

                    {/* { <Logout />} */}
                    {isDesktop &&  <p>Logout</p>}
                </NavLink>
            </li>
      </ul>}
    </nav>
  )
}

export default NavigationMenu
