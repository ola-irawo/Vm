import React, { useRef, useState } from 'react'
import "./otp.css"
import { NavLink } from 'react-router-dom';
import { otpImage, useWindowWidth } from '../..';
import { useDispatch } from 'react-redux';
import { verifyOTPAction } from '../../actions/authAction';
import Button from '../../../../components/ui/Button';
import brandLogo from "../../../../assets/svgs/brandLogo.svg"

const OtpField = () => {
    const length = 6
    const [otp, setOtp] = useState(Array(length).fill(""))
    const inputRefs = useRef([...Array(length)].map(() => React.createRef()));
    const {screenWidth} = useWindowWidth()
    const dispatch = useDispatch()

    const isMobile = screenWidth <= 767

    const onComplete = (otp) => {
        console.log('OTP entered:', otp);
    };

    const handleInputChange = (value, index) => {
        if (isNaN(value)) return;
    
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    
        // Move to the next input field if value is not empty
        if (value !== '' && index < length - 1) {
          inputRefs.current[index + 1].focus();
        }
    
        // Call onComplete callback if all inputs are filled
        if (newOtp.every((entry) => entry !== '')) {
          onComplete(newOtp.join(''));
        }
      };

    const handleInputKeyDown = (event, index) => {
        // Move to the previous input field on backspace if current input is empty
        if (event.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputRefs.current[index - 1].focus();
        }
    };

    const verifyOTP = (e) => {
        e.preventDefault()
        
        console.log(otp)
        const otpValue = otp.join("")
        try{
            const options = {
                method: "POST",
                body: JSON.stringify({
                    email: "irawo302@gmail.com",
                    otp: otpValue
                }),
            };

            dispatch(verifyOTPAction(options))
        }
        catch(error){
            // console.log(error)
        }
    }


    const renderOTP = () => {
    return (
        <form onSubmit={verifyOTP} className="otp-form">
            <div className="input-container">
                {otp.map((value, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleInputChange(e.target.value, index)}
                    onKeyDown={(e) => handleInputKeyDown(e, index)}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                />
                ))}
            </div>

            <Button text={"Verify"} />
        </form>
        );
    }

  return (
    <article className="otp-container">
        <div className="otp-wrapper">

            <div className="otp-image-container">
                <img src={otpImage} className="otp-image" alt="OTP" />
               {!isMobile &&  <h3>Welcome back</h3>}
                {!isMobile && <p>...bridging the gap between social media and mental health.</p>}
            </div>

            <div className="otp-content-container">
               {
                    !isMobile &&  <div className="otp-brand-container">
                        <img src={brandLogo} className="otp-brand-img" alt="brand-logo" />
                    </div>
                }

                <div className="otp-text-container">
                    <h3>OTP Verification</h3>
                    <p>Enter the OTP sent to <span>irawo@gmail.com</span></p>
                </div>

                {renderOTP()}
                <div className="otp-resend-link-container">
                    <p className="otp-resend-link"> Didn’t receive the OTP?</p>
                    <NavLink to="">Resend OTP</NavLink>
                </div>
            </div>
        </div>

    </article>
  )
}

export default OtpField
