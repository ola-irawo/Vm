import React, { useEffect, useState } from 'react'
import "./header.css"
import { NavLink } from 'react-router-dom'
import { closeMenu, ellipse, ellipse7, hamburger, useWindowWidth} from "../../index"
import brandLogo from "../../../../assets/svgs/brandLogo.svg"

const Header = () => {
  const [showHeaderNav, setShowHeaderNav] = useState(false)
  const {screenWidth} = useWindowWidth()

  useEffect(() => {
    if(screenWidth >= 768){
      setShowHeaderNav(true)
    }
  }, [screenWidth])

  const isMobile = screenWidth <= 767;

  const handleHamburgerMenuClick = () => {
    setShowHeaderNav(!showHeaderNav);
  };

  const renderHeaderNav = () => {
    if (!showHeaderNav) {
      return null;
    }

    const navigationLinks = [
      {
        path: "",
        label: "How we help",
        key: 1,
        to: ""
      },
      {
        path: "",
        label: "About Us",
        key: 2,
      },
      {
        path: "",
        label: "FAQS",
        key: 3,
        to: "#a"
      },
      {
        path: "",
        label: "Contact Us",
        key: 4,
      },
      {
        path: "/login",
        label: "Sign in",
        key: 5,
      },
      {
        path: "/register",
        label: isMobile ?  "Join Us" : "Get Started",
        key: 6,
      },
    ]

    return (
      <nav className="header-nav-container">
        <ul className="header-nav-list">
          { 
            isMobile && <li className="header-nav-item">
            <img src={closeMenu} className="close-menu" alt="close-menu" onClick={handleHamburgerMenuClick} />
            </li>
          }

          {navigationLinks.slice(0, 4).map(link => (
              <li className="header-nav-item" key={link.key}>
                <span className="item-wrapper">
                  { isMobile && <img src={ellipse} alt="ellipse" className="ellipse"/>}
                  <NavLink key={link.key} to={link.path} smooth>{link.label}</NavLink>
                </span>
            </li>
          ))}
        </ul>

        <ul className="header-nav-list">
          {navigationLinks.slice(4, 6).map((link, index) => (
                <li className="header-nav-item" key={link.key}>
                  <span className="item-wrapper">
                    { isMobile && <img src={index === 1 ? ellipse7 : ellipse} alt="ellipse" className="ellipse"/>}
                    <NavLink key={link.key} to={link.path}>{link.label}</NavLink>
                  </span>
              </li>
            ))}
        </ul>
      </nav>
    )
  }

  return (
    <header className="header-container">
      <div className="header-wrapper">
        <div className="brand-hamburger-container">
          <div className="brand-container">
            <img src={brandLogo} className="brand-logo" alt="brand-logo"/>
          </div>
        {
            isMobile && <div className="hamburger-container" onClick={handleHamburgerMenuClick}>
              <img src={hamburger} className="hamburger-menu" alt="hamburger-menu" />
            </div>
          }
        </div>
        {renderHeaderNav()}
      </div>
    </header>
  )
}

export default Header