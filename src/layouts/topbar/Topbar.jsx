import React from 'react'
import './topbar.css'
import Form from '../../components/Form'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import profileAvatarIcon from "./assets/svgs/profileAvatarIcon.svg"
import notification from "./assets/svgs/notification.svg"
import useWindowWidth from '../../hooks/useWindowWidth'

const Topbar = () => {
    const {screenWidth} = useWindowWidth()
    const navigate = useNavigate()
    const location = useLocation()
    const {id} = useParams()

    const currentRoute = location.pathname

    const secondSlashIndex = currentRoute.indexOf("/", currentRoute.indexOf("/") + 1);
    const contentAfterSecondSlash = currentRoute.slice(secondSlashIndex + 1);

    const template = {
        fields: [
            {
                name: "",
                type: "text",
                placeholder: " Search for societies, users or contents"
            }
        ]
    }
    
    const isMobile = screenWidth <= 767
  return (
    <header className="topbar-header" aria-label="Utility Bar" role="toolbar">
        <div className="topbar-wrapper">

            {!isMobile 
                && 
                <h1 style={{display: "flex", alignItems: "center", gap: "1rem"}}> 
                    {currentRoute !== "/home" && 
                        <svg  onClick={() => navigate(-1)} xmlns="http://www.w3.org/2000/svg" width="27" height="15" viewBox="0 0 28 15" fill="none">
                            <path d="M0.292891 6.79289C-0.0976333 7.18342 -0.0976334 7.81658 0.29289 8.2071L6.65685 14.5711C7.04738 14.9616 7.68054 14.9616 8.07107 14.5711C8.46159 14.1805 8.46159 13.5474 8.07107 13.1569L2.41421 7.5L8.07107 1.84314C8.46159 1.45262 8.46159 0.819455 8.07107 0.42893C7.68054 0.038406 7.04738 0.038406 6.65685 0.42893L0.292891 6.79289ZM28 6.5L0.999998 6.5L0.999998 8.5L28 8.5L28 6.5Z" fill="#263238"/>
                        </svg>
                    } 
            
                    {
                        id ? contentAfterSecondSlash : currentRoute.slice(1).charAt(0).toUpperCase() + currentRoute.slice(2)
                    }
                </h1>
            }

            { isMobile &&  <div className="topbar-profile-icon">
                <img src={profileAvatarIcon} alt="Notification Icon - View notifications" />
            </div>
            }
            <Form template={template} />

            {!isMobile && <nav className="topbar-nav">
                <ul className="topbar-nav-list">
                    <li className="=nav-list-item">
                        <NavLink>
                            <img src={notification} alt="Societies Icon - Explore societies" />
                        </NavLink>
                    </li>
                    <li className="=nav-list-item">
                        <NavLink>
                            <img src={profileAvatarIcon} alt="Notification Icon - View notifications" />
                        </NavLink>
                    </li>
                </ul>
            </nav>}
      </div>

    </header>
  )
}

export default Topbar
