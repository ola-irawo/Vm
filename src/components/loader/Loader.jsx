import React from 'react'
import "./loader.css"

const Loader = () => {

  const renderLoader = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="164" height="159" viewBox="0 0 164 159" fill="none">
      <ellipse cx="84" cy="15" rx="16" ry="15" fill="#407BFF"/>
      <ellipse cx="84" cy="144" rx="16" ry="15" fill="#407BFF"/>
      <ellipse cx="149" cy="82.5" rx="15" ry="15.5" fill="#407BFF"/>
      <ellipse cx="130.5" cy="126" rx="15.5" ry="15" fill="#407BFF"/>
      <ellipse cx="15" cy="82.5" rx="15" ry="15.5" fill="#407BFF"/>
      <circle cx="35" cy="35" r="15" fill="#407BFF"/>
      <ellipse cx="35" cy="126" rx="16" ry="15" fill="#407BFF"/>
  </svg>
  }

  return (
    <div className="loader-container">
        {renderLoader()}
        <p>Loading
          <span style={{"--dot": "1"}}>.</span>
          <span style={{"--dot": "2"}}>.</span>
          <span style={{"--dot": "3"}}>.</span>
        </p>
    </div>
  )
}

export default Loader
