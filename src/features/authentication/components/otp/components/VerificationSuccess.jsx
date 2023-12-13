import React from 'react'
import "./verification-success.css"
import success from "../assets/svgs/success.svg"
import Button from '../../../../../components/ui/Button'
import { bottomSvg, leftSvg, rightSvg } from '../../..'

const VerificationSuccess = () => {
  return (
    <article className="success-article">
        <div className="success-wrapper">

            <div className="success-img-container">
                <img src={success} alt="success-verification" />
            </div>

            <div className="success-content-container">
                <h2>Verification Successful</h2>
                <p>Congratulations! Your account has been verified successfully.</p>
            </div>

            <div className="success-btn-container">
                <Button text={"Continue"} />
            </div>
      </div>

        {/* Background Icons */}
        <div className="success-bg-icons-container">
            <img src={rightSvg} className="success-bg-icon" alt="backgroud-icon" />
            <img src={leftSvg}  className="success-bg-icon" alt="backgroud-icon" />
            <img src={bottomSvg}  className="success-bg-icon" alt="backgroud-icon" />
        </div>
    </article>
  )
}

export default VerificationSuccess
